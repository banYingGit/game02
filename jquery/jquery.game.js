(function () {
        'use strict';


        var atuoTime, moveSrc = '', moveEl = '', checkObj = {subject: [], answer: []}, correctNum = 0, checkoutNum = 0,
            timeNum = 0, textErrpr = 0;


        var green = ['g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8', 'g9', 'g10', 'g11', 'g12', 'g13', 'g14'],

            blue = ['b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9', 'b10', 'b11', 'b12', 'b13', 'b14'],

            dark = ['d1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd9', 'd10', 'd11', 'd12', 'd13', 'd14'],

            yellow = ['y1', 'y2', 'y3', 'y4', 'y5', 'y6', 'y7', 'y8', 'y9', 'y10', 'y11', 'y12', 'y13', 'y14'],

            orange = ['o1', 'o2', 'o3', 'o4', 'o5', 'o6', 'o7', 'o8', 'o9', 'o10', 'o11', 'o12', 'o13', 'o14'],

            violet = ['v1', 'v2', 'v3', 'v4', 'v5', 'v6', 'v7', 'v8', 'v9', 'v10', 'v11', 'v12', 'v13', 'v14'],

            num = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30']

        var newArr = green.concat(blue).concat(dark).concat(yellow).concat(orange).concat(violet)


        _event()


        function _event() {

            $('#goscreen2').click(function () {

                $('#screen1').remove()

                $('#screen2').show()

            });

            $('#goscreen3').click(function () {

                $('#screen2').remove()

                $('#screen3').show()

                _screen3()


            })

            $('#goscreen10').click(function () {

                var stepSrc = $(this).attr('src')

                if (stepSrc.indexOf('stepDis') != -1) return


                if ($('#screen4 img[data-role="error"]').length > 0) {
                    textErrpr = textErrpr + 1

                    console.log('textErrpr', textErrpr)

                    if (textErrpr < 2) {
                        $('#screen3').show()
                        $('#screen4').hide()
                        _screen3()

                    } else if (textErrpr = 2) {

                        $('#screen3').remove()
                        $('#screen4').remove()
                        $('#screen10').show()
                    }

                } else {


                    $('#screen3').remove()
                    $('#screen4').remove()

                    $('#screen10').show()


                }


            })

            $('#goscreen5').click(function () {

                $('#screen10').remove()


                _screen5()


            })

            $('ul[data-role="leaveBox"] > li').on('click', 'img[data-role="leaveImg"]', function (e) {

                var elment = $(this)


                _moveImg(elment, false)


                var src = elment.attr('src'),
                    role = elment.attr('data-check')

                // console.log('src,role', src, role)

                _checkImg(elment, src, role)

                var parId = $(e.delegateTarget).parents('.srceen1').attr('id'),

                    chooseEl = $('#' + parId + ' ul[data-role="leaveBox"]')

                _checkImgCom(chooseEl)

            })
            $('ul[data-role="moveBox"] > li').on('click', 'img[data-role="moveImg"]', function (e) {

                var elment = $(this)


                _moveImg(elment, true)

                var parId = $(e.delegateTarget).parents('.srceen1').attr('id'),

                    chooseEl = $('#' + parId + ' ul[data-role="leaveBox"]')

                _checkImgCom(chooseEl)

            })

            $('#sure').click(function () {

                _scoring()


                console.log('已经答题次数', checkoutNum)

                if (checkoutNum == 1) {


                    $('#screen7').show()
                    $('#tipPop').hide()
                    $('#screen6').hide()

                    console.log('答题时间还没到，暂停上一计时器')
                    clearInterval(atuoTime)

                    var el = $('#suspend')
                    _time(300, el, function () {

                        $('#continueAns').attr({'src': 'img/continue.png'})

                        $('#continueAns').click(function () {

                            $('#screen7').hide()

                            $('#screen9').show()

                        })

                    })

                } else {

                    $('#screen5').remove()
                    $('#screen6').remove()
                    $('#screen7').remove()
                    $('#tipPop').remove()
                    $('#screen8').show()


                }

            })

            $('#cancel').click(function () {

                $('#tipPop').hide()

            })


            $('#stop').click(function () {

                clearInterval(atuoTime)
                $('#screenStop').show()
                $('#screen7').hide()

            })

            $('#continue').click(function () {

                $('#screenStop').hide()
                $('#screen7').show()

                var el = $('#suspend')

                var cur = $('#suspend').text()

                _time(cur, el, function () {

                    $('#continueAns').attr({'src': 'img/continue.png'})

                    $('#continueAns').click(function () {

                        $('#screen7').hide()

                        $('#screen9').show()

                    })

                })

            })

            $('#startTwo').click(function () {
                $('#screen9').hide()
                _screen5()
            })
        }

        function _screen3() {

            $('#screen4 ul[data-role="leaveBox"] li').find('img[data-role="leaveImg"]').attr('src', 'img/seat.png')
            $('#screen4 ul[data-role="leaveBox"] li .result').find('img').attr({'src': 'img/seat.png', 'data-role': ''})
            $('#testTime').text('10')
            $('#goscreen10').attr({'src': 'img/stepDis.png'})

            var el = $('#testTime')

            var subObj = _setSubject(true),

                subjectArr = subObj.subject,

                answerArr = subObj.answer;

            for (var i = 0; i < 2; i++) {

                $('#screen3 .shape-list li').eq(i).find('img[data-role="subject"]').attr({'src': 'img/shape/' + subjectArr[i] + '.png'})


                $('#screen3 .shape-list li').eq(i).find('img[data-role="answer"]').attr({'src': 'img/shape/' + answerArr[i] + '.png'})

            }


            _time(10, el, function () {

                $('#screen3').hide()

                $('#screen4').show()


                var ansObj = _setAnswer(true),

                    ansObjArrA = ansObj.answer,

                    ansObjArrS = ansObj.subject;


                for (var i = 0; i < 4; i++) {

                    $('#screen4 ul[data-role="moveBox"] li').eq(i).find('img[data-role="moveImg"]').attr({'src': 'img/shape/' + ansObjArrA[i] + '.png'})

                }
                for (var n = 0; n < 2; n++) {

                    $('#screen4 ul[data-role="leaveBox"] li').eq(n).find('img[data-role="subjectImg"]').attr({'src': 'img/shape/' + ansObjArrS[n] + '.png'})

                    $('#screen4 ul[data-role="leaveBox"] li').eq(n).find('img[data-role="leaveImg"]').attr({'data-check': answerArr[n]})

                }


            })

        }

        function _screen5() {

            $('#screen5').show()

            checkoutNum = checkoutNum + 1

            var subObj = _setSubject(false),

                subjectArr = subObj.subject,

                answerArr = subObj.answer;

            for (var i = 0; i < 6; i++) {

                $('#screen5 .shape-list li').eq(i).find('img[data-role="subject"]').attr({'src': 'img/shape/' + subjectArr[i] + '.png'})


                $('#screen5 .shape-list li').eq(i).find('img[data-role="answer"]').attr({'src': 'img/shape/' + answerArr[i] + '.png'})

            }

            var el = $('#curTime')

            _time(30, el, function () {

                $('#screen5').hide()


                $('#screen6').show()

                var ansObj = _setAnswer(false),

                    ansObjArrA = ansObj.answer,

                    $ansObjArrA = ansObj.$answer,

                    ansObjArrS = ansObj.subject;

                for (var i = 0; i < 6; i++) {

                    $('#screen6 ul[data-role="moveBox"] li').eq(i).find('img[data-role="moveImg"]').attr({'src': 'img/shape/' + ansObjArrA[i] + '.png'})

                }
                for (var n = 0; n < 4; n++) {

                    $('#screen6 ul[data-role="leaveBox"] li').eq(n).find('img[data-role="subjectImg"]').attr({'src': 'img/shape/' + ansObjArrS[n] + '.png'})

                    $('#screen6 ul[data-role="leaveBox"] li').eq(n).find('img[data-role="leaveImg"]').attr({'data-check': $ansObjArrA[n]})

                }

                clearInterval(atuoTime)

                $('#ansTime').text('30')
                $('#curTime').text('30')

                var s6Time = $('#ansTime')

                _time(30, s6Time, function () {

                    console.log('答题时间30秒已经到了自动计算答对数量')

                    _scoring()

                    if (checkoutNum == 1) {

                        $('#screen7').show()

                        $('#screen6').hide()

                        clearInterval(atuoTime)

                        var el = $('#suspend')
                        _time(300, el, function () {

                            $('#continueAns').attr({'src': 'img/continue.png'})

                            $('#continueAns').click(function () {

                                $('#screen7').hide()
                                $('#screen9').show()

                            })
                        })

                    } else {

                        $('#screen5').remove()
                        $('#screen6').remove()
                        $('#screen7').remove()
                        $('#tipPop').remove()
                        $('#screen8').show()


                    }


                })

            })


        }


        function _time(i, el, fn) {

            var timeFn = function () {

                i = i - 1

                el.text(i)

                if (i == 0) {

                    clearInterval(atuoTime)

                    fn && fn.call(this)

                }

            }

            atuoTime = setInterval(timeFn, 1000);


        }


        function _moveImg(el, isMove) {


            var $src = el.attr('src'),

                $newSrc = $src.indexOf('seat') == -1 ? $src : '';


            if (isMove) {


                if (!moveSrc) {


                    if (!!$newSrc) {
                        moveSrc = $newSrc

                        el.parent('li').addClass('active')

                        moveEl = el.parent('li')

                    }

                } else {

                    if (!!$newSrc) {


                        moveSrc = $newSrc
                        moveEl.parents('ul').children('li').children('p').removeClass('active')
                        el.parent('li').siblings('li').removeClass('active')
                        el.parent('li').addClass('active')

                        moveEl = el.parent('li')


                    } else {

                        el.attr('src', moveSrc)
                        moveEl.removeClass('active').find('img').attr('src', 'img/seat.png')
                        moveSrc = ''

                    }

                    return

                }


            } else {


                if (!!moveSrc) {

                    if (!$newSrc) {


                        el.attr('src', moveSrc)


                        moveSrc = ''

                        moveEl.removeClass('active').find('img').attr('src', 'img/seat.png')


                    } else {


                        moveEl.parents('ul').children('li').children('p').removeClass('active')
                        el.parent('p').addClass('active')

                        moveEl.parents('ul').children('li').removeClass('active')
                        moveEl = el.parent('p')

                        moveSrc = $newSrc

                    }
                } else {


                    if (!!$newSrc) {

                        el.parent('p').addClass('active')

                        moveEl.parents('ul').children('li').removeClass('active')
                        moveEl = el.parent('p')

                        moveSrc = $newSrc
                    }

                    return

                }

            }

        }


        function _checkImg(clickEl, imgSrc, check) {

            var isSrc = imgSrc.indexOf('seat');

            if (isSrc == -1) {


                if (imgSrc.indexOf(check) != -1) {


                    clickEl.parent('p').siblings('span').show().children('img').attr({
                        'src': 'img/result1.png',
                        'data-role': 'true'
                    })


                } else {

                    clickEl.parent('p').siblings('span').show().children('img').attr({
                        'src': 'img/result2.png',
                        'data-role': 'error'
                    })

                }

            }
        }


        function _checkImgCom(el) {

            var num = el.children('li').length,

                leaveN = 0;

            for (var i = 0; i < num; i++) {

                var src = el.children('li').eq(i).find('img[data-role="leaveImg"]').attr('src')

                if (src.indexOf('seat') != -1) {

                    el.children('li').eq(i).children('span.result').hide()
                    leaveN = leaveN - 1

                } else {

                    leaveN = leaveN + 1


                }

            }


            if (leaveN == num) {

                $('#goscreen10').attr({'src': 'img/step.png'})

                var screen = el.parents('div.srceen1').attr('id')

                if (screen == 'screen6') {

                    if (!$('#screen6 ul[data-role="leaveBox"] li').children('p.shapebg2').hasClass('active')) {

                        $('#tipPop').show()
                    }


                }


            } else {

                $('#goscreen10').attr({'src': 'img/stepDis.png'})
            }


        }


        function _scoring() {

            var numLi = $('#screen6 ul[data-role="leaveBox"] li').length

            for (var i = 0; i < numLi; i++) {

                var src = $('#screen6 ul[data-role="leaveBox"] li').eq(i).find('img[data-role="leaveImg"]').attr('src'),
                    check = $('#screen6 ul[data-role="leaveBox"] li').eq(i).find('img[data-role="leaveImg"]').attr('data-check')

                if (src.indexOf(check) != -1) {

                    correctNum = correctNum + 1


                }

                $('#screen6 ul[data-role="leaveBox"] li').eq(i).find('img[data-role="leaveImg"]').attr('src', 'img/seat.png')


            }

            var curTime = +($('#ansTime').text());

            timeNum = timeNum + (30 - curTime)


            // console.log('当前答对数量', correctNum)
            //
            // console.log('当前用时', timeNum)

            clearInterval(atuoTime)


            if (checkoutNum == 2) {
                $('#uesTime').text(timeNum)

                $('#score').text(correctNum * 100)

                var param = {

                    timeNum: timeNum,

                    correctNum: correctNum
                }
                console.log('请求接口返回数据', param)
            }
        }


        function _setSubject(isStart) {

            var subjectArr, answerArr, summaryArr, $summaryArr, $num;

            if (isStart) {

                subjectArr = _getArrayItems(newArr, 2)

                summaryArr = _repeat(newArr, subjectArr)

                $summaryArr = _getArrayItems(summaryArr, 1)

                $num = _getArrayItems(num, 1)


                answerArr = $summaryArr.concat($num)

            } else {


                subjectArr = _getArrayItems(newArr, 6)

                summaryArr = _repeat(newArr, subjectArr)

                $summaryArr = _getArrayItems(summaryArr, 4)

                $num = _getArrayItems(num, 2)


                answerArr = $summaryArr.concat($num)


            }

            checkObj.subject = subjectArr;

            checkObj.answer = _getArrayItems(answerArr, 6);

            return checkObj

        }


        function _setAnswer(isStart) {

            var subArr = checkObj.subject,

                ansArr = checkObj.answer,

                obj = {};

            if (isStart) {

                obj.subject = subArr

                var errArrA = _repeat(newArr, ansArr),

                    $errArrA = _getArrayItems(errArrA, 1),

                    errArrB = _getArrayItems(num, 1),

                    errArr = $errArrA.concat(errArrB).concat(ansArr);

                obj.answer = _getArrayItems(errArr, 4)

            } else {


                obj.subject = _getArrayItems(subArr, 4)

                var $ansArr = []

                for (var n = 0; n < obj.subject.length; n++) {
                    for (var i = 0; i < subArr.length; i++) {

                        if (subArr[i] == obj.subject[n]) {

                            $ansArr.push(ansArr[i])

                        }

                    }


                }

                var errArrA = _repeat(newArr, $ansArr),

                    $errArrA = _getArrayItems(errArrA, 1),

                    errArrB = _getArrayItems(num, 1),

                    errArr = $errArrA.concat(errArrB).concat($ansArr);

                obj.answer = _getArrayItems(errArr, 6)

                obj.$answer = $ansArr

            }


            return obj

        }


        function _getArrayItems(arr, num) {

            var array = [];

            for (var index in arr) {

                array.push(arr[index]);
            }

            var return_array = [];

            for (var i = 0; i < num; i++) {

                if (array.length > 0) {

                    var arrIndex = Math.floor(Math.random() * array.length);

                    return_array[i] = array[arrIndex];

                    array.splice(arrIndex, 1);

                } else {
                    break;
                }
            }
            return return_array;
        }


        function _repeat(sumArr, subArr) {

            var repArr = [];

            for (var i = 0; i < sumArr.length; i++) {

                for (var n = 0; n < subArr.length; n++) {

                    if (sumArr[i] == subArr[n]) {

                        sumArr.splice(i, 1);

                        repArr = sumArr

                    }

                }


            }
            return repArr;
        }

    }

    ()
);




