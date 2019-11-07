import { defineSupportCode } from 'cucumber';
import { browser, element, by, $$ } from 'protractor';
import { accessSync } from 'fs';
import { async, when } from 'q';
import { expect } from 'chai';
import {  ExpectedConditions} from 'protractor';
import { Alert } from 'selenium-webdriver';
import { protractor } from 'protractor/built/ptor';
import { Binary } from 'selenium-webdriver/firefox';


defineSupportCode(({ Given, When, Then }) => {

    // tslint:disable-next-line: only-arrow-functions
    Given(/^I am in home page$/, async function() {
        await browser.get('http://ec2-18-224-56-85.us-east-2.compute.amazonaws.com:3001/login');
        browser.sleep(5000);
    });
    // tslint:disable-next-line: only-arrow-functions
    When(/^I enter login details$/, async function() {
        await element(by.id('mat-input-0')).sendKeys('jaryn.makbel@golld.usp');
        browser.sleep(3000);
        await element(by.id('mat-input-1')).sendKeys('Test@1234');
        browser.sleep(3000);
        // tslint:disable-next-line: deprecation
        await $$('.login-btn').get(0).click();
        await browser.sleep(5000);

    });
    // tslint:disable-next-line: only-arrow-functions
    // Then(/^i am in dashboard$/, async function() {
    //     const Url = await browser.getCurrentUrl();
    //     console.log(Url);
    //     browser.sleep(3000);
    //     // tslint:disable-next-line: comment-format
    //     expect(Url).to.equal('http://ec2-18-224-56-85.us-east-2.compute.amazonaws.com:3001/freelancer/dashboard');
    // });
    // tslint:disable-next-line: only-arrow-functions
    Then(/^i enter facebook link$/, async function() {
        await browser.get('http://ec2-18-224-56-85.us-east-2.compute.amazonaws.com:3001/freelancer/settings');
        browser.sleep(3000);
        await ($('.col-md-12 #fb') as any).clear();
        await ($('.col-md-12 #fb') as any).sendKeys('http://abc.com');
        browser.sleep(3000);
        ($('.col-md-12 #fb') as any).click();
        browser.sleep(10000);
        await browser.get('http://ec2-18-224-56-85.us-east-2.compute.amazonaws.com:3001/freelancer/settings');
        browser.sleep(5000);
        const fbLink = await ($('.col-md-12 #fb') as any).getAttribute('value');
        console.log(fbLink);
    });
    // tslint:disable-next-line: only-arrow-functions
    When(/^i move mouse on profile$/, async function() {
        await browser.get('http://ec2-18-224-56-85.us-east-2.compute.amazonaws.com:3001/freelancer/dashboard');
        browser.sleep(5000);
        const managerDetails = await element(by.css('.headerprofile-manager'));
        await browser.actions().mouseMove(managerDetails).perform();
        browser.sleep(3000);
        const dropDown = await element.all(by.css('.profile-top ul li')).getText();
        // console.log(dropDown.toString());
        // expect(dropDown).to.contain('My Plans');
        // browser.sleep(3000);
        await element.all(by.css('.profile-top a')).get(3).click();
        browser.sleep(5000);
        const bUrl = await browser.getCurrentUrl();
        console.log(bUrl);
        browser.sleep(3000);
    });
    // tslint:disable-next-line: only-arrow-functions
    Then(/^i check for plan details$/, async function() {
        const Plan = await element(by.css('.m-b-18 .h2')).getText();
        console.log(Plan);
        browser.sleep(5000);
    });
    // tslint:disable-next-line: only-arrow-functions
    When(/^i am in subscription page$/, async function() {
        await browser.get('http://ec2-18-224-56-85.us-east-2.compute.amazonaws.com:3001/freelancer/subscription/settings');
        browser.sleep(5000);
        await element.all(by.css('.m-t-50 .d-block')).get(2).click();
        browser.sleep(3000);
        const sUrl = await browser.getCurrentUrl();
        console.log(sUrl);
    });
    // // tslint:disable-next-line: only-arrow-functions
    // tslint:disable-next-line: only-arrow-functions
    Then(/^i turn off auto subsription$/, async function() {
        await element(by.css('.d-flex .switch')).click();
        browser.sleep(2000);
        browser.refresh();
    });

    // tslint:disable-next-line: only-arrow-functions
    Then(/^i click on log out button$/, async function() {
        await browser.get('http://ec2-18-224-56-85.us-east-2.compute.amazonaws.com:3001/freelancer/dashboard');
        browser.sleep(3000);
        const managerDetails = await element(by.css('.headerprofile-manager'));
        await browser.actions().mouseMove(managerDetails).perform();
        browser.sleep(3000);
        await element.all(by.css('.dropdown-content ul li')).get(6).click();
        browser.sleep(5000);
        const url = await browser.getCurrentUrl();
        console.log(url);
    });

    // tslint:disable-next-line: only-arrow-functions
    Then(/^i am in dashboard and move to TO DO$/, async function() {
        await browser.get('http://ec2-18-224-56-85.us-east-2.compute.amazonaws.com:3001/freelancer/dashboard');
        browser.sleep(2000);
        await element.all(by.css('.actions ul li')).get(0).click();
        browser.sleep(2000);
        const url = await browser.getCurrentUrl();
        console.log(url);
    });

    // tslint:disable-next-line: only-arrow-functions
    Given(/^i am in home page$/, async function() {
        await browser.get('http://ec2-18-224-56-85.us-east-2.compute.amazonaws.com:3001/');
        browser.sleep(5000);
        await element.all(by.css('.col-md-4 ul li')).get(7).click();
        browser.sleep(3000);
        const url = await browser.getCurrentUrl();
        console.log(url);
    });
    // tslint:disable-next-line: only-arrow-functions
    Then(/^i search for freelancer$/, async function() {
        await element(by.css('.search-input .form-control')).sendKeys('radhika');
        await browser.actions().sendKeys(protractor.Key.ENTER).perform();
    });
    // tslint:disable-next-line: comment-format
    // tslint:disable-next-line: only-arrow-functions
    Then(/^i print the search results$/, async function() {
        browser.sleep(5000);
        // tslint:disable-next-line: only-arrow-functions
        await element.all(by.css('.feedheader-details .ref-id')).getText().then(function(idNo) {
            // tslint:disable-next-line: prefer-for-of
            for (let i = 0; i < idNo.length; i++) {
                console.log(idNo[i]);
            }
        });
        browser.sleep(3000);
    });
    // tslint:disable-next-line: only-arrow-functions
    Then(/^I move to my campaigns$/, async function() {
        const mycamp = await element.all(by.css('.actions-links li')).get(1);
        browser.actions().mouseMove(mycamp).perform();
        browser.sleep(2000);
        await element.all(by.css('.actions-links .dropdown-content li a')).get(0).click();
        browser.sleep(5000);
        // tslint:disable-next-line: only-arrow-functions
        await element.all(by.css('.actions-links .dropdown-content li')).getText().then(function(options){
            // tslint:disable-next-line: prefer-for-of
            for (let i = 0 ; i < options.length; i++) {
                console.log(options[i]);
            }});
        const pUrl = await browser.getCurrentUrl();
        console.log(pUrl);
    });
    // tslint:disable-next-line: only-arrow-functions
    Then(/^I display all my camp names$/, async function() {
        const campName = await element.all(by.css('.porposal-header h4 span:nth-child(1)')).getText();
        console.log(campName.toString());
    });
    // tslint:disable-next-line: only-arrow-functions
    Then(/^I check for camp names in my invitations$/, async function() {
        const mycamp = await element.all(by.css('.actions-links li')).get(1);
        browser.actions().mouseMove(mycamp).perform();
        browser.sleep(2000);
        await element.all(by.css('.actions-links .dropdown-content li a')).get(1).click();
        browser.sleep(3000);
        const invites = await element.all(by.css('.feedheader-details .feed-name a')).getText();
        console.log(invites.toString());
    });
    // tslint:disable-next-line: only-arrow-functions
    Given(/^i am in dashboard$/, async function() {
        await browser.get('http://ec2-18-224-56-85.us-east-2.compute.amazonaws.com:3001/login');
        browser.sleep(3000);
        await element(by.id('mat-input-0')).sendKeys('jaryn.makbel@golld.us');
        browser.sleep(3000);
        await element(by.id('mat-input-1')).sendKeys('Test@1234');
        browser.sleep(3000);
        await $$('.login-btn').get(0).click();
        await browser.sleep(5000);
    });
    // tslint:disable-next-line: only-arrow-functions
    Then(/^i navigate to settings page$/, async function() {
        const managerDetails = await element(by.css('.headerprofile-manager'));
        await browser.actions().mouseMove(managerDetails).perform();
        await element.all(by.css('.dropdown-content ul li')).get(5).click();
        browser.sleep(5000);
        const url = await browser.getCurrentUrl();
        console.log(url);
    });
    // tslint:disable-next-line: only-arrow-functions
    Then(/^i move to change password screen$/, async function() {
        const changePassword = await element.all(by.css('.leftbar-links ul li')).get(1);
        await browser.actions().mouseMove(changePassword).perform();
        await changePassword.click();
        browser.sleep(3000);
    });
    // tslint:disable-next-line: only-arrow-functions
    Then(/^i change the password$/, async function() {
        await element.all(by.css('.col-md-12 .mat-input-element')).get(0).sendKeys('12345678');
        browser.sleep(2000);
        await element.all(by.css('.col-md-12 .mat-input-element')).get(1).sendKeys('Test@12345');
        browser.sleep(2000);
        await element.all(by.css('.col-md-12 .mat-input-element')).get(2).sendKeys('Test@12345');
        browser.sleep(2000);
        await element.all(by.css('.text-right .mat-button-wrapper')).click();
        browser.sleep(5000);
        const managerDetails = await element(by.css('.headerprofile-manager'));
        await browser.actions().mouseMove(managerDetails).perform();
        browser.sleep(3000);
        await element.all(by.css('.dropdown-content ul li')).get(6).click();
        browser.sleep(5000);
    });
    // tslint:disable-next-line: only-arrow-functions
    Then(/^i login using new password$/, async function() {
        await browser.get('http://ec2-18-224-56-85.us-east-2.compute.amazonaws.com:3001/login');
        browser.sleep(3000);
        await element(by.id('mat-input-0')).sendKeys('jaryn.makbel@golld.usp');
        browser.sleep(3000);
        await element(by.id('mat-input-1')).sendKeys('Test@1234');
        browser.sleep(3000);
        await $$('.login-btn').get(0).click();
        await browser.sleep(5000);
    });

    // tslint:disable-next-line: only-arrow-functions
    Then(/^i move to reviews page$/, async function() {
        const managerDetails = await element(by.css('.headerprofile-manager'));
        await browser.actions().mouseMove(managerDetails).perform();
        await element.all(by.css('.dropdown-content ul li')).get(1).click();
        browser.sleep(5000);
        const url = await browser.getCurrentUrl();
        console.log(url);
    });
    // tslint:disable-next-line: only-arrow-functions
    Then(/^i get review details$/, async function() {
        const count = await element.all(by.css('.profile-review-content li')).count();
        console.log(count);
        for ( let i = 0 ; i < count ; i++ ) {
        const client = await element.all(by.css('.review .name span')).get(0).getText();
        console.log(client);
        const review = await element.all(by.css('.review-details .review-desc')).getText();
        console.log(review);
        }
    });
    // tslint:disable-next-line: only-arrow-functions
    Given(/^i am in client login$/, async function(){
        await browser.get('http://ec2-18-224-56-85.us-east-2.compute.amazonaws.com:3001/login');
        browser.sleep(3000);
        await element(by.id('mat-input-0')).sendKeys('fernando.alexzander@golld.us');
        browser.sleep(3000);
        await element(by.id('mat-input-1')).sendKeys('Test@1234');
        browser.sleep(3000);
        await $$('.login-btn').get(0).click();
        await browser.sleep(5000);
});
    // tslint:disable-next-line: only-arrow-functions
    Then(/^i click on create campaigns$/, async function(){
        const postCamp = await $$('.actions li').get(0);
        await browser.actions().mouseMove(postCamp).perform();
        postCamp.click();
        browser.sleep(5000);
        const url = await browser.getCurrentUrl();
        console.log(url);
        browser.sleep(3000);
    });
    // tslint:disable-next-line: only-arrow-functions
    Then (/^i fill all details$/, async function(){
        await element.all(by.css('.col-sm-12 .form-control')).get(0).sendKeys('camp_automation');
        await element.all(by.css('.col-sm-12 .form-control')).get(1).sendKeys('test project test project test project');
        const category = await element(by.css('#mat-select-0 .mat-select-trigger'));
        await browser.actions().mouseMove(category).perform();
        await category.click();
        browser.sleep(3000);
        await element.all(by.css('.mat-select-content #mat-option-15')).get(0).click();
        browser.sleep(5000);
        await element.all(by.css('#mat-select-1 .mat-select-trigger')).click();
        browser.sleep(3000);
        await element.all(by.css('.mat-select-content #mat-option-22')).get(0).click();
        browser.sleep(5000);
        await element.all(by.css('#mat-select-2 .mat-select-trigger')).click();
        browser.sleep(3000);
        await element.all(by.css('.ng-trigger #mat-option-1')).click();
        browser.sleep(3000);
        await element.all(by.css('#mat-select-3 .mat-select-trigger')).click();
        browser.sleep(3000);
        await element.all(by.css('.mat-select-content #mat-option-9')).click();
        browser.sleep(3000);
        await element.all(by.css('.col-sm-4 .form-control')).get(4).sendKeys('45');
        browser.sleep(3000);
        await element.all(by.css('#mat-select-4 .mat-select-trigger')).click();
        browser.sleep(3000);
        await element.all(by.css('.mat-select-content #mat-option-12')).click();
        browser.sleep(3000);
        await element.all(by.css('.col-md-3')).get(2).click();
        browser.sleep(3000);
        await element.all(by.css('.col-md-6')).get(1).click();
        browser.sleep(3000);
        await element.all(by.css('.button-section .m-r-7')).click();
        browser.sleep(5000);
        const dUrl = await browser.getCurrentUrl();
        console.log(dUrl);
    });

    // tslint:disable-next-line: only-arrow-functions
    Then(/^i publish that campaign$/, async function(){
        await browser.get('http://ec2-18-224-56-85.us-east-2.compute.amazonaws.com:3001/client/campaign/list?status=1');
        browser.sleep(5000);
        await element.all(by.css('.campaign-details')).get(1).click();
        browser.sleep(5000);
        await element.all(by.css('.invite .btn')).get(0).click();
        browser.sleep(3000);
        console.log(await browser.getCurrentUrl());
        browser.sleep(5000);
        await element.all(by.css('.form-group .btn')).get(0).click();
        browser.sleep(3000);
        console.log(await browser.getCurrentUrl());
        });
    // tslint:disable-next-line: only-arrow-functions
    Then(/^i move the camp to in progress$/, async function(){
        await browser.get('http://ec2-18-224-56-85.us-east-2.compute.amazonaws.com:3001/client/campaign/list?status=2');
        browser.sleep(5000);
        await element.all(by.css('.campaign-details')).get(0).click();
        browser.sleep(5000);
        await element.all(by.css('.invite .btn')).get(1).click();
        browser.sleep(4000);
    });
    // tslint:disable-next-line: only-arrow-functions
    Then(/^move camp to complete$/, async function(){
        await browser.get('http://ec2-18-224-56-85.us-east-2.compute.amazonaws.com:3001/client/campaign/list?status=3');
        browser.sleep(3000);
        await element.all(by.css('.campaign-details')).get(0).click();
        browser.sleep(3000);
        await element.all(by.css('.invite .btn')).get(0).click();
        browser.sleep(4000);
    });
    // tslint:disable-next-line: only-arrow-functions
    Then(/^i get the count of campaigns$/, async function(){
        await browser.get('http://ec2-18-224-56-85.us-east-2.compute.amazonaws.com:3001/client/campaign/list?status=1');
        browser.sleep(3000);
        const savedCamp = await element.all(by.css('.campaign-details')).count();
        console.log('count of save camp : ' + savedCamp);
        await browser.get('http://ec2-18-224-56-85.us-east-2.compute.amazonaws.com:3001/client/campaign/list?status=2');
        browser.sleep(3000);
        const publishCamp = await element.all(by.css('.campaign-details')).count();
        console.log('count of published camp : ' + publishCamp);
        await browser.get('http://ec2-18-224-56-85.us-east-2.compute.amazonaws.com:3001/client/campaign/list?status=3');
        browser.sleep(3000);
        const inprogressCamp = await element.all(by.css('.campaign-details')).count();
        console.log('count of inprogress camp : ' + inprogressCamp);
        await browser.get('http://ec2-18-224-56-85.us-east-2.compute.amazonaws.com:3001/client/campaign/list?status=4');
        browser.sleep(3000);
        const completecamp = await element.all(by.css('.campaign-details')).count();
        console.log('count of completed camp : ' + completecamp);
    });
    // tslint:disable-next-line: only-arrow-functions
    Then(/^i count the fav freelancer$/, async function(){
        const header = await element(by.css('.headerprofile-manager'));
        await browser.actions().mouseMove(header).perform();
        browser.sleep(3000);
        await element.all(by.css('.dropdown-content.profile ul li a')).get(1).click();
        browser.sleep(3000);
        console.log(await browser.getCurrentUrl());
        const count = await element.all(by.css('.send-proposal-content ul li')).count();
        console.log(count);
        const lancerName = await element.all(by.css('.porposal-header h4')).getText();
        console.log(lancerName);
        browser.sleep(3000);
    });
    // tslint:disable-next-line: only-arrow-functions
    Then(/^i remove freelance from favorite$/, async function(){
        await element.all(by.css('.porposal-details .small.mat-button.mat-warn')).get(3).click();
        browser.sleep(3000);
        await element.all(by.css('.delete-model .form-group .btn')).get(0).click();
        browser.sleep(3000);
        const lancerName = await element.all(by.css('.porposal-header h4')).getText();
        console.log(lancerName);
        browser.sleep(3000);
    });
    // tslint:disable-next-line: only-arrow-functions
    Then (/^i add favorte freelancer$/, async function(){
        await browser.get('http://ec2-18-224-56-85.us-east-2.compute.amazonaws.com:3001/client/search?keyword=&isManager=false');
        browser.sleep(3000);
        await element.all(by.css('.search-input .form-control')).sendKeys('lucy');
        await browser.actions().sendKeys(protractor.Key.ENTER).perform();
        browser.sleep(3000);
        await element.all(by.css('.freelancer-details .fav-freelancer')).click();
        browser.sleep(3000);
        await browser.get('http://ec2-18-224-56-85.us-east-2.compute.amazonaws.com:3001/client/favourite-freelancers');
        const lancerName = await element.all(by.css('.porposal-header h4')).getText();
        console.log(lancerName);
        browser.sleep(3000);
    });
    // tslint:disable-next-line: only-arrow-functions
    Then(/^i check for background color$/, async function(){
        await browser.get('http://ec2-18-224-56-85.us-east-2.compute.amazonaws.com:3001/freelancer/campaign/list?status=2');
        browser.sleep(5000);
        const header = await element.all(by.css('.actions-links li')).get(1);
        await browser.actions().mouseMove(header).perform();
        browser.sleep(3000);
        header.click();
        // for (let i = 0; i < 4; i++) {
        //     await element.all(by.css('.leftbar-links ul li')).get(i).click();
        // }
    });
});
