# encoding: utf-8
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.http import HttpResponse, JsonResponse, Http404
from wechatpy.utils import check_signature
from wechatpy import parse_message
from wechatpy.replies import TextReply
from django.views.decorators.csrf import csrf_exempt
from adWrist.models import userlist, sportrecords
from datetime import *
from urllib.request import *
import json
import config
# Create your views here.


serverIP = config.serverIP
API_ID = config.API_ID
API_SECRET = config.API_SECRET
TOKEN = config.TOKEN


@csrf_exempt
def handle_msg(request):
    if request.method == 'GET':
        signature = request.GET.get('signature')
        timestamp = request.GET.get('timestamp')
        nonce = request.GET.get('nonce')
        echo_str = request.GET.get('echostr')
        check_signature(TOKEN, signature, timestamp, nonce)
        return HttpResponse(echo_str)
    elif request.method == 'POST':
        body = request.body
        msg = parse_message(body)
        rep = TextReply()
        rep.source = msg.target
        rep.target = msg.source
        if msg.type == 'event':
            if msg.event == 'click':
                print(msg.key)
                if msg.key == 'sports_advice':
                    rep.content = recommend_plan(msg.source)
                elif msg.key == 'view_info':
                    rep.content = get_info(msg.source)
                elif msg.key == 'add_test':
                    rep.content = add_test(msg.source)
                elif msg.key == 'show_today':
                    rep.content = get_datatoday(msg.source)
            elif msg.event == 'subscribe':
                rep.content = create_newuser(msg.source)
            else:
                rep.content = '!!!'
        else:
            rep.content = '<a href="http://learn.tsinghua.edu.cn">你好</a>'
        repxml = rep.render()
        return HttpResponse(repxml)


def create_newuser(openID):
    try:
        cur_user = userlist.objects.get(user_open_id=openID)
    except userlist.DoesNotExist:
        new_user = userlist(
            user_open_id = openID
        )
        new_user.save()
        return '欢迎你，新用户'
    else:
        return '欢迎你，老朋友'


def show_info_page(request):
    if request.method == 'GET':
        code = request.GET.get('code')
        openID = get_openid(code)
        return render_to_response('personalInfo.html',{'openID':openID },context_instance=RequestContext(request))
    else:
        raise Http404


def add_test(openID):
    try:
        cur_user = userlist.objects.get(user_open_id = openID)
    except userlist.DoesNotExist:
        rep = '好像出问题了，请填写信息'
    else:
        print(openID)
        date = datetime.now()
        for i in range(7):
            new_record1 = sportrecords(
                sportrecords_person_id=cur_user,
                sportrecords_sport_type='慢跑',
                sportrecords_quantity=2000,
                sportrecords_calorie=500
            )
            new_record2 = sportrecords(
                sportrecords_person_id=cur_user,
                sportrecords_sport_type='走路',
                sportrecords_quantity=1000,
                sportrecords_calorie=200
            )
            new_record1.save()
            new_record2.save()
            new_record1.sportrecords_end_time = date + timedelta(days=-i)
            new_record2.sportrecords_end_time = date + timedelta(days=-i)
            new_record1.save()
            new_record2.save()
        rep = '添加成功'
    return rep


def get_datatoday(openID):
    try:
        cur_user = userlist.objects.get(user_open_id=openID)
    except userlist.DoesNotExist:
        rep = '好像出问题了，请填写信息'
    else:
        cur_data = sportrecords.objects.filter(sportrecords_person_id=cur_user,
                                               sportrecords_end_time__startswith=datetime.today().date())
        if cur_data :
            walk_quantity = 0
            slow_run_quantity = 0
            walk_calorie = 0
            slow_run_calorie = 0
            for single_data in cur_data:
                if single_data.sportrecords_sport_type == '慢跑':
                    slow_run_quantity += single_data.sportrecords_quantity
                    slow_run_calorie += single_data.sportrecords_calorie
                elif single_data.sportrecords_sport_type == '走路':
                    walk_quantity += single_data.sportrecords_quantity
                    walk_calorie += single_data.sportrecords_calorie
            rep = '您今天慢跑:\n'+str(slow_run_quantity)+'步\n消耗卡路里:\n'+str(slow_run_calorie)+'大卡\n您今天走路:\n'+str(walk_quantity)+'步\n消耗卡路里:\n'+str(walk_calorie)+'大卡'
        else:
            rep = '没查到数据'
    return rep


def get_info(openID):
    try:
        cur_user = userlist.objects.get(user_open_id=openID)
    except userlist.DoesNotExist:
        rep = '您还没有填写个人信息'
    else:
        if cur_user.user_confirmed:
            age = cur_user.user_age
            if cur_user.user_sex:
                sex = '男'
            else:
                sex = '女'
            weight = cur_user.user_weight
            height = cur_user.user_height
            rep = '您的年龄:'+str(age)+'\n您的性别:'+sex+'\n您的身高:'+str(height)+'cm\n您的体重:'+str(weight)+'kg'
        else:
            rep = '您还没有填写个人信息'
    return rep


def recommend_plan(openID):
    try:
        cur_user = userlist.objects.get(user_open_id=openID)
    except userlist.DoesNotExist:
        plan = '您还没有填写个人信息'
    else:
        if cur_user.user_confirmed:
            if cur_user.user_sex:
                bmr = 66 + 13.7*cur_user.user_weight + 5*cur_user.user_height - 6.8*cur_user.user_age
            else:
                bmr = 655 + 9.6*cur_user.user_weight + 1.8*cur_user.user_height - 4.7*cur_user.user_age
            bmi = cur_user.user_weight*10000/(cur_user.user_height*cur_user.user_height)
            if bmi < 18.5:
                fatflag = 0
                msg = "体重过小，不宜减肥"
            elif bmi>=18.5 and bmi<24.5:
                msg = "体重正常，建议维持"
                fatflag = 1
            elif bmi>25 and bmi<32:
                msg = "超重，注意减肥"
                fatflag = 2
            else:
                msg = "严重超重"
                fatflag = 3
            if fatflag >= 2:
                caladvise = bmr * 0.55
            else:
                caladvise = bmr * 0.375
            rundistance = caladvise*1.6/100
            walkdistance = caladvise/52
            plan = "您的身体状况是：" + msg + "\n每天建议额外消耗:" + str(int(caladvise)) + "大卡\n即慢跑：" + \
                   str(int(rundistance)) + "公里\n或走路：" + str(int(walkdistance)) + "公里\n"
        else:
            plan = '您还没有填写个人信息'
    return plan


def change_info(request):
    if request.method == 'GET':
        openID = request.GET.get('openID')
        type = request.GET.get('type')
        if type == 'init':
            try:
                cur_user = userlist.objects.get(user_open_id=openID)
            except userlist.DoesNotExist:
                new_user = userlist(
                    user_open_id = openID
                )
                new_user.save()
                return JsonResponse({"age": new_user.user_age, "sex": new_user.user_sex, "weight": new_user.user_weight,
                                     "height": new_user.user_height})
            else:
                return JsonResponse({"age": cur_user.user_age, "sex": cur_user.user_sex, "weight": cur_user.user_weight,
                                     "height": cur_user.user_height})
        elif type == 'confirm':
            sex = request.GET.get('sex')
            if sex == 'true':
                sex = True
            else:
                sex = False
            age = request.GET.get('age')
            height = request.GET.get('height')
            weight = request.GET.get('weight')
            try:
                cur_user = userlist.objects.get(user_open_id=openID)
            except userlist.DoesNotExist:
                newuser = userlist(
                    user_open_id=openID,
                    user_age=age,
                    user_sex=sex,
                    user_height=height,
                    user_weight=weight,
                    user_confirmed=True
                )
                newuser.save()
            else:
                cur_user.user_age = age
                cur_user.user_sex = sex
                cur_user.user_height = height
                cur_user.user_weight = weight
                cur_user.user_confirmed = True
                cur_user.save()
            return HttpResponse('success')
    else:
        raise Http404

def show_history(request):
    if request.method == 'GET':
        code = request.GET.get('code')
        openID = get_openid(code)
        return render_to_response('sportdata_check_previous.html', {'openID': openID},
                                  context_instance=RequestContext(request))
    else:
        raise Http404


def check_previous(request):
    if request.method == 'GET':
        openID = request.GET.get('openID')
        year = request.GET.get('year')
        month = request.GET.get('month')
        day = request.GET.get('day')
        try:
            cur_user = userlist.objects.get(user_open_id=openID)
        except userlist.DoesNotExist:
            rep = {"flag": 'failed'}
        else:
            cur_data = sportrecords.objects.filter(sportrecords_person_id=cur_user,
                                                   sportrecords_end_time__startswith=date(int(year), int(month), int(day)))
            if cur_data:
                walk_quantity = 0
                slow_run_quantity = 0
                walk_calorie = 0
                slow_run_calorie = 0
                for single_data in cur_data:
                    if single_data.sportrecords_sport_type == '慢跑':
                        slow_run_quantity += single_data.sportrecords_quantity
                        slow_run_calorie += single_data.sportrecords_calorie
                    elif single_data.sportrecords_sport_type == '走路':
                        walk_quantity += single_data.sportrecords_quantity
                        walk_calorie += single_data.sportrecords_calorie
                rep = {"flag": 'success', "sporttype": '走路', "quantity": walk_quantity, "calorie": walk_calorie}
            else:
                rep = {"flag": 'failed'}
        return JsonResponse(rep)


def oauth_test(request):
    if request.method == 'GET':
        code = request.GET.get('code')
        openID = get_openid(code)
        return HttpResponse(openID)
    else:
        raise Http404


def show_chart(request):
    if request.method == 'GET':
        code = request.GET.get('code')
        openID = get_openid(code)
        return render_to_response('pedometer.html', {'openID': openID},
                                  context_instance=RequestContext(request))
    else:
        raise Http404


def get_openid(code):
    url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + API_ID + '&secret=' + API_SECRET + \
              '&code=' + code + '&grant_type=authorization_code'
    res_data = urlopen(url)
    res = res_data.read()
    resj = json.loads(res.decode('utf-8'))
    openID = resj['openid']
    return openID

def get_steps(request):
    if request.method == 'GET':
        openID = request.GET.get('openID')
        type = request.GET.get('type')
        if type == 'init':
            cur_date = datetime.today().date()
            print(cur_date)
        else:
            datestr = request.GET.get('date')
            datelist = datestr.split('-')
            cur_date = date(int(datelist[0]),int(datelist[1]),int(datelist[2]))
            if type == 'next':
                cur_date += timedelta(days=1)
            elif type == 'previous':
                cur_date += timedelta(days=-1)
        try:
            cur_user = userlist.objects.get(user_open_id = openID)
        except userlist.DoesNotExist:
            rep = {"goal": 0, "steps": 0, "distance": 0, "cal": 0}
        else:
            cur_data = sportrecords.objects.filter(sportrecords_person_id=cur_user,
                                               sportrecords_end_time__startswith=cur_date)
            if cur_data:
                print(cur_data)
                walk_quantity = 0
                walk_calorie = 0
                for single_data in cur_data:
                    if single_data.sportrecords_sport_type == '走路':
                        walk_quantity += single_data.sportrecords_quantity
                        walk_calorie += single_data.sportrecords_calorie
                dist = float(str('%.2f' % (walk_quantity*0.5/1000)))
                goal = 20000
                rep = {"goal": goal, "steps": walk_quantity, "distance": dist,  "cal": walk_calorie}
            else:
                rep = {"goal": 0, "steps": 0, "distance": 0, "cal": 0}
        if type != 'someday':
            rep['date'] = str(cur_date)
        print(rep)
        return JsonResponse(rep)
    else:
        raise Http404


