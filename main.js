// ==UserScript==
// @name choukatest
// @namespace Violentmonkey Scripts
// @match *://gamewith.jp/fireemblem/article/*
// @grant none
// @license MIT
// @version  1.1.1
// ==/UserScript==
//

window.onload = () => {
    let startBtn = $('div.yet-to-do-inner a.js-remake-magic-circle')
    startBtn.trigger('click')

    // 获取 up 英雄名称列表
    let upCharas = $("ol#PickupUnitTable div.chara-cap")
    let upCharasNameList = []
    upCharas.each((index, ele) => {
        upCharasNameList.push(ele.innerText)
    })
    console.log(`精选英雄有: ${upCharasNameList}`)

    window.start = start
    window.getAmountByName = getAmountByName
    window.refresh = refresh
    let totalAmount = 0
    let otherColorOrbe = 0

    console.log("使用示例： start(2000,'green', interval=10) ")
    console.log("使用示例： start(宝珠数量,'宝珠颜色', 抽卡间隔毫秒) ")

    let usedOrbe = parseInt($("#UseOrbe").text())

    let startNextAround = () => {
        $(".js-remake-magic-circle").trigger('click')
    }

    // 不再使用以下函数来实现单色查询
    // function getRedBall() {
    //     return $('a[rel="赤"]')
    // }
    //
    // function getGreenBall() {
    //     return $('a[rel="緑"]')
    // }
    //
    // function getGreyBall() {
    //     return $('a[rel="無"]')
    // }
    //
    // function getBlueBall() {
    //     return $('a[rel="青"]')
    // }


    //哈希 ( 颜色 : 选择器 )
    let colorHash = {
        'red': 'a[rel="赤"]',
        'blue': 'a[rel="青"]',
        'green': 'a[rel="緑"]',
        'grey': 'a[rel="無"]'
    }

    // 用于单色或多色查询的函数
    function getSpecificBalls(userInput) {
        let colorArray = userInput.split(',')


        // 从 颜色: 选择器哈希中 获取一个选择器数组
        selectorArray = colorArray.map(element =>
            colorHash[element]
        )

        // 拼接选择器字符串 用于 jquery 并联查询
        return $(selectorArray.join())
    }

    /* 在找不到指定颜色的时候执行 */
    function openRandomBall() {
        $('div#GachaDoing li a').eq(0).trigger('click')
        otherColorOrbe += 1
    }

    /* 指定颜色 */
    function openAll() {
        $(".js-all-open").trigger('click')
    }

    function openSpecific(userInput) {
        if (getSpecificBalls(userInput).length > 0) {
            getSpecificBalls(userInput).trigger('click')
        }
        else {
            openRandomBall()
        }
    }

    // function openRed() {
    //     if (getRedBall().length > 0) {
    //         getRedBall().trigger('click')
    //     }
    //     else {
    //         openRandomBall()
    //     }
    // }
    //
    // function openGreen() {
    //     if (getGreenBall().length > 0) {
    //         getGreenBall().trigger('click')
    //     }
    //     else {
    //         openRandomBall()
    //     }
    // }
    //
    // function openGrey() {
    //
    //     if (getGreyBall().length > 0) {
    //         getGreyBall().trigger('click')
    //     }
    //     else {
    //         openRandomBall()
    //     }
    // }
    //
    // function openBlue() {
    //     if (getBlueBall().length > 0) {
    //         getBlueBall().trigger('click')
    //     }
    //     else {
    //         openRandomBall()
    //     }
    // }

    function openerSelector(userInput) {

        if (userInput === 'all') {
            openAll()
            startNextAround()
        }

        else {
            openSpecific(userInput)
            startNextAround()
        }

    }

    let outputResult = () => {
        let RarePercent5 = $('span#RarePercent5').text()
        let RareCount5 = $('span#RareCount5').text()
        let GachaCount = $('span#GachaCount').text()
        let UseOrbe = $('span#UseOrbe').text()

        let getUpCharaAmount = () => {

            let matchedUpHeros = 0
            // 获取抽卡结果
            let heroesResult = $("div.chara-name")
            let resultHeroesNameList = []

            // 获取抽卡结果英雄名称列表
            heroesResult.each((index, ele) => {
                resultHeroesNameList.push(ele.innerText)
            })

            //
            $(resultHeroesNameList).each((index, element) => {

                $(upCharasNameList).each((i, e) => {
                    if (element === e) {
                        matchedUpHeros += 1
                    }
                })

            })

            return matchedUpHeros
        }

        let matchedHerosAmount = getUpCharaAmount()
        let matchedHerosRate = `${( (matchedHerosAmount / parseInt(GachaCount)) * 100 ).toFixed(4)  } %`

        let result =
            `
            测试完成, 一共消耗 ${UseOrbe}石头, 召唤 ${GachaCount}, 
            其中异色珠召唤次数为: ${otherColorOrbe} , 
            一共抽到5星: ${RareCount5}, 概率为: ${RarePercent5},
            一共抽到精选英雄 ${matchedHerosAmount} 个, 概率为 ${matchedHerosRate}
            `

        return result
    }

    function start(Amount, userInput, interval = 10) {
        if (Number.isInteger(totalAmount) && Number.isInteger(interval) && typeof userInput === 'string') {
            totalAmount += Amount
            let timer = setInterval(
                () => {
                    usedOrbe = parseInt($("#UseOrbe").text())
                    openerSelector(userInput)
                    console.log('start')
                    if (usedOrbe > totalAmount) {
                        clearInterval(timer)
                        console.log(outputResult())

                    }
                },
                interval)
        }
        else {
            alert('错误的输入')
        }
    }


    function getAmountByName(name) {
        let allResult = $("div.chara-name")

        let _array = []
        allResult.each((i, e) => {
            if (e.innerText === name) {
                _array.push(e)
            }

        })
        return _array.length
    }


    function refresh() {
        location.reload()
    }

}
