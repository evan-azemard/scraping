const puppeteer = require('puppeteer-extra')
const randomUseragent = require('random-use ragent')
const { Cluster } = require('puppeteer-cluster');
const { stringify } = require('querystring');
const { Page } = require('puppeteer');
const { off } = require('process');
const { Z_BLOCK } = require('zlib');


///////////////////CONFIG HEAD//////////////
const scrap = async () => {

    const browser = await puppeteer.launch
    ({
        ignoreDefaultArgs: ["--enable-automation"],
        headless: false,
        slowMo: 500,
        args: ['--proxy-server='],
    })
    ///////////////////CREATE INCOGNITO BROWSER//////////////
    console.log('create browser');
    console.log('create new page');
    const context = await browser.createIncognitoBrowserContext();

    const page = await context.newPage();
    await page.setGeolocation({ latitude: 90, longitude: 20 })

    const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36';
    const userAgent = randomUseragent.getRandom()
    const UA = userAgent || USER_AGENT

    await page.setUserAgent(UA.toString())
    await page.setJavaScriptEnabled(true)
    await page.setDefaultNavigationTimeout(0);

    await page.setViewport({
        width: 1680,
        height: 970,
        deviceScaleFactor: 1,
        hasTouch: false,
        isLandscape: false,
        isMobile: false,
    });
    ////////////////////////CONFIG INT///////////////////////

    function entierAleatoire(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
    let entier = entierAleatoire(1000, 300);
    let entier3 = entierAleatoire(100, 600);
    let entier4 = entierAleatoire(600, 1000);
    let entier5 = entierAleatoire(1000, 1500);
    let entier6 = entierAleatoire(1500, 2200);

    ////////////////////////START///////////////////////////
    console.log('initialisation var')
    let verifurl = false
    let activitee = false
    let button = false
    let choix = false
    let choixNONE = false
    let verifUserfield = false
    let verifPasswordfield = false
    let veriftxtUserID = false
    let verifTxtPassword = false
    let verifTxtUserID1 = false
    console.log("go to maprimerenov")
    await page.waitForTimeout(entier6)
    page.goto('https://www.maprimerenov.gouv.fr/')
    await page.waitForTimeout(entier5)

    if(page.url() === "https://www.maprimerenov.gouv.fr/prweb/PRAuth/app/AIDES_/BPNVwCpLW8TKW49zoQZpAw*/!STANDARD"){
        console.log("url ok");
    }else if(page.url() === "https://www.maprimerenov.gouv.fr/"){
        console.log("url ok");
    }else{
        console.log("(e1) => /! PAGE URL KO : RECOMMENCER LE SCRIPT /! ", page.url())
        console.log('screenshot ok => error.png');
        await page.screenshot({ path: "error.png", fullPage: true }, { delay: 1000 })
        browser.close()
        process.exit()
    }
    await page.waitForTimeout(5000)

    /////////// /////////////// CLICK BUTTON CONNEXION/////////////
    console.log("search linkactivitee");

    await page.evaluate(() => {

        let button = document.querySelector("#RULE_KEY > div > div > div > div.content-item.content-layout.item-6.remove-top-spacing.remove-bottom-spacing.align-end.set-width-auto.flex.flex-row > div > div > span > button")

        if (button) {
            console.log("click button");
            button.click()
            button.click()
            button = true
        }
    })
    await page.waitForTimeout(entier6)

    ////////////////////////// CHOIX NONE INPUT USER//////////////////////
    await page.evaluate(() => {
        if(document.querySelector("#txtUserID")){
            verifTxtUserID1 = true
        }
    })

    if(verifTxtUserID1 === true){
        choixNONE = true
        console.log("choix none");
        await page.waitForTimeout(entier4)

        await page.evaluate(() => {
            var userfield = document.querySelector("#txtUserID")
            console.log("txtUserID");
            if (txtUserID) {
                console.log("click txtUserID");
                userfield.click()
                veriftxtUserID = true
            }
        })

        await page.waitForTimeout(500)

        console.log('select input userfield')
        if(veriftxtUserID === true){
            await page.type('[name=UserIdentifier]', 'millet02021974@mailo.com', { delay: 200 })
        }

        await page.waitForTimeout(2000)

        await page.evaluate(() => {
            var passwordfield = document.querySelector("#txtPassword")
            console.log("#txtPassword");
            if (passwordfield) {
                console.log("click txtPassword");
                passwordfield.click()
                verifTxtPassword = true
            }
        })
        if(verifTxtPassword === true){
            await page.waitForTimeout(500)
            console.log('select input password')
            await page.type('[name=Password]', 'Esteban02021974@', { delay: 200 })
            await page.keyboard.press('Enter')
            console.log('enter')
        }

    }

    if(verifTxtUserID1 === false){

        // ////////////////////////// CLICK CHOIX //////////////////////
        await page.waitForTimeout(entier4)
        await page.evaluate(() => {
            let choix = document.querySelector("body > div.layout.layout-noheader.padding-tb-0.margin-t-0.container-background > div > div:nth-child(2) > div > div > div > div > div:nth-child(1) > div")
            if (choix) {
                console.log("click choix");
                choix.click()
                choix.click()
                console.log("choix ok");
                choix = true
            }
        })

        if(choix === false){
            console.log('choix ko');
            console.log("(e3) => /! CLICK CHOIX KO : RECOMMENCER LE SCRIPT /! ", page.url())
            console.log('screenshot ok => error.png');
            await page.screenshot({ path: "error.png", fullPage: true }, { delay: 1000 })
            // browser.close()
            // process.exit()
        }
        ////////////////////////CLICK INPUT1//////////////////////////
        await page.waitForTimeout(entier4)
        await page.evaluate(() => {
            var userfield = document.querySelector("#userfield")
            console.log(userfield);
            if (userfield) {
                console.log("click userfield");
                userfield.click()
                verifUserfield = true
            }
        })
        if(verifUserfield === false) {
            console.log('userfield ko');
            console.log("(e4) => /! CLICK CHOIX KO : RECOMMENCER LE SCRIPT /! ", page.url())
            console.log('screenshot ok => error.png');
            await page.screenshot({ path: "error.png", fullPage: true }, { delay: 1000 })
            // browser.close()
            // process.exit()
        }else{
            await page.waitForTimeout(500)
            console.log('select input userfield')
            await page.type('[name=user]', 'millet02021974@mailo.com', { delay: 200 })
        }
        ////////////////////////CLICK INPUT2//////////////////////////
        await page.waitForTimeout(2000)
        await page.evaluate(() => {
            var passwordfield = document.querySelector("#passwordfield")
            console.log("passwordfield");
            if (passwordfield) {
                console.log("click passwordfield");
                passwordfield.click()
                verifPasswordfield = true
            }
        })
        if(verifPasswordfield === false) {
            console.log('link passwordfield ko');
            console.log('passwordfield ko');
            console.log("(e5) => /! CLICK CHOIX KO : RECOMMENCER LE SCRIPT /! ", page.url())
            console.log('screenshot ok => error.png');
            await page.screenshot({ path: "error.png", fullPage: true }, { delay: 1000 })
            // browser.close()
            // process.exit()
        }else{
            await page.waitForTimeout(500)
            console.log('select input password')
            await page.type('[name=password]', 'Esteban02021974@', { delay: 200 })
            await page.keyboard.press('Enter')
            console.log('enter')
        }
    }

    // ////////////////////////RECUP DATA////////////////////////////

    //   const result = await page.evaluate(() => {
    //             let numero = document.querySelector("#RULE_KEY > div > div > div > div.content-item.content-layout.item-1.remove-top-spacing.remove-left-spacing.flex.flex-row > div > div > div > div.content-item.content-layout.item-1.remove-top-spacing.remove-bottom-spacing.remove-left-spacing.flex.flex-row > div > div > div > div.content-item.content-layout.item-1.remove-top-spacing.remove-bottom-spacing.remove-left-spacing.flex.flex-row > div > div > div > div.content-item.content-label.item-2.remove-bottom-spacing.remove-right-spacing.standard_bold_dataLabelRead.dataLabelRead.standard_bold_dataLabelRead.flex.flex-row")
    //             let date = document.querySelector("#CT > span")
    //             let ville = document.querySelector("#CT > span")
    //             let statut = document.querySelector("#RULE_KEY > div > div > div > div.content-item.content-layout.item-1.remove-top-spacing.remove-left-spacing.flex.flex-row > div > div > div > div.content-item.content-layout.item-2.remove-top-spacing.remove-bottom-spacing.remove-left-spacing.remove-right-spacing.flex.flex-row > div > div > div > div.content-item.content-layout.item-1.remove-top-spacing.remove-left-spacing.flex.flex-row.align-end > div > div > div > div.content-item.content-field.item-2.remove-top-spacing.remove-bottom-spacing.remove-left-spacing.right-aligned.dataValueRead.flex.flex-row > span > button")
    //             let montant = document.querySelector("#RULE_KEY > div > div > div > div.content-item.content-layout.item-3.flex.flex-row > div > div > div > div.content-item.content-layout.item-3.remove-left-spacing.remove-bottom-spacing.remove-right-spacing.flex.flex-row > div > div > div > div.content-item.content-layout.item-2.remove-all-spacing.flex.flex-row > div > div > div > div > span > span")
    //             let travaux = document.querySelector('#RULE_KEY > div > div > div > div.content-item.content-layout.item-3.flex.flex-row > div > div > div > div.content-item.content-layout.item-1.remove-left-spacing.remove-top-spacing.flex.flex-row > div > div > div > div > div > div > div > div.content-item.content-label.item-2.remove-bottom-spacing.remove-right-spacing.standard_bold_dataLabelRead.dataLabelRead.standard_medium_dataLabelRead.flex.flex-row')

    //             if (numero) {
    //                 numuero = document.querySelector("#RULE_KEY > div > div > div > div.content-item.content-layout.item-1.remove-top-spacing.remove-left-spacing.flex.flex-row > div > div > div > div.content-item.content-layout.item-1.remove-top-spacing.remove-bottom-spacing.remove-left-spacing.flex.flex-row > div > div > div > div.content-item.content-layout.item-1.remove-top-spacing.remove-bottom-spacing.remove-left-spacing.flex.flex-row > div > div > div > div.content-item.content-label.item-2.remove-bottom-spacing.remove-right-spacing.standard_bold_dataLabelRead.dataLabelRead.standard_bold_dataLabelRead.flex.flex-row").innerText
    //             } else {
    //                 numero = ""
    //             }
    //             if (date) {
    //                 date = document.querySelector("#CT > span").innerText
    //             } else {
    //                 date = ""
    //             }
    //             if (statut) {

    //                 statut = document.querySelector("#RULE_KEY > div > div > div > div.content-item.content-layout.item-1.remove-top-spacing.remove-left-spacing.flex.flex-row > div > div > div > div.content-item.content-layout.item-2.remove-top-spacing.remove-bottom-spacing.remove-left-spacing.remove-right-spacing.flex.flex-row > div > div > div > div.content-item.content-layout.item-1.remove-top-spacing.remove-left-spacing.flex.flex-row.align-end > div > div > div > div.content-item.content-field.item-2.remove-top-spacing.remove-bottom-spacing.remove-left-spacing.right-aligned.dataValueRead.flex.flex-row > span > button").innerText
    //             } else {
    //                 statut = ""
    //             }
    //             if (montant) {
    //                 montant = document.querySelector("#RULE_KEY > div > div > div > div.content-item.content-layout.item-3.flex.flex-row > div > div > div > div.content-item.content-layout.item-3.remove-left-spacing.remove-bottom-spacing.remove-right-spacing.flex.flex-row > div > div > div > div.content-item.content-layout.item-2.remove-all-spacing.flex.flex-row > div > div > div > div > span > span").innerText
    //             } else {
    //                 montant = ""
    //             }
    //             if (travaux) {
    //                 travaux = document.querySelector("##RULE_KEY > div > div > div > div.content-item.content-layout.item-3.flex.flex-row > div > div > div > div.content-item.content-layout.item-1.remove-left-spacing.remove-top-spacing.flex.flex-row > div > div > div > div > div > div > div > div.content-item.content-label.item-2.remove-bottom-spacing.remove-right-spacing.standard_bold_dataLabelRead.dataLabelRead.standard_medium_dataLabelRead.flex.flex-row").innerText
    //             } else {
    //                 travaux = ""
    //             }
    //             if (ville) {
    //                 ville = document.querySelector("#CT > span").innerText
    //             } else {
    //                 ville = ""
    //             }
    //             return { numero, date, ville, statut, montant,travaux }
    //         })

    //         const fs = require('fs').promises;
    //         console.log('recup data');
    //         await fs.appendFile('./data.json', JSON.stringify(result, null, 2));

    // browser.close()
    // process.exit()

}

scrap()
    .catch(e => console.log(`error: ${e}`))

