---
layout: "lesson"
title: "Use goals to measure business objectives"
date: "2021-10-27"
status: "publish"
course_id: "96770"
original_url: "/lti-content/courses/beginners-guide-to-google-analytics/lesson/use-goals-to-measure-business-objectives-4/"
---

### **How to set up Goals in Analytics**

Before we begin creating a goal in Google Analytics, let's distinguish between two types of goals: business goals and Google Analytics Goals.

Business goals are the actions you want website visitors to take. When a user completes one of your business objectives, this is referred to as a "conversion." This could be as simple as signing up for a newsletter or purchasing a product.

![](https://r2.businesscrowd.co.uk/wp-content/uploads/2021/10/unnamed-300x114.png)

However, Google Analytics has a feature called "Goals" that allows you to track these conversions. Once Goals are configured, Analytics will generate conversion-related metrics. for example, the total number of conversions and the percentage of users who converted This is known as the "conversion rate."

When you create a Goal in Google Analytics, you have the option of creating a "goal funnel." This is a data visualization of the various steps needed to complete the goal. This chart can help you figure out where people are abandoning the conversion process. eCommerce businesses could use goals and funnels to determine if users are capable of completing a multi-step checkout process. Other businesses could monitor newsletter sign-ups, contact form completions, page navigations, the number of pages viewed in a session, or time spent on the website.

You must be an Administrator on the View where you wish to activate Goals in Analytics. Also, keep in mind that you may only create up to 20 objectives per view, so think carefully about which goals are most essential to your company.

First, determine what you want to track based on your business goals. Since This Google Store is an eCommerce store, one goal they could track is successful checkouts. So, let's set a goal for every time a user reaches the checkout confirmation page. We'll also put up a funnel visualization to observe whether users are dropping off on their way to the confirmation page. It should be noted that this Goal will not track actual revenue; instead, it will track how far users get each step of the goal and where they may abandon the process. Creating a funnel visualization to track goal completions is completely optional, but it may add a lot of visibility into each step of the conversion flow.

#### **Goal Setup**

To get started, we’ll go into the Admin section. Then, under “Views,” we’ll click “Goals.” Then we’ll click “New Goal.” Note that your Goal setup may look a little different than the one for The Google Store, depending on your business type. Analytics provides you with some pre-set business goal templates. Since we want to track whether users made it to the checkout page for The Google Store, we’ll choose “Buy merchandise” and click “Continue.”

Because we want to track checkout confirmations, we’ll name the goal: “Checkout Complete.” Each goal uses a particular “Goal Slot ID” that is numbered from one to twenty. The Goal Slot ID is a simple way to organize your goals. The default slot will always be the next slot available. If you’re creating your first goal, the Goal Slot ID will be “1,” but you can choose a different slot if you have certain goals that you wish to group together.

![Goal Setup](https://r2.businesscrowd.co.uk/wp-content/uploads/2021/10/Goal-Setup-300x246.png)

you can only use the “Destination”- type goal, so we’ll select “Destination” and click “Continue.”

Next, in the "Destination" box, enter the URL of the "Order Complete" page. The destination URL is the URL of the page that appears after the user converts or completes the conversion process. Rather than entering the full URL, we want to look for something distinctive in that URL that will allow us to track our progress using only this page. Since none of the web pages in the Google Store have "SubmitOrder" in the URL, we'll use this to identify our "Order Complete" page.

You'll notice that if we select "Equals to," type "forward-slash SubmitOrder," and click "Verify" at the bottom, we don't see any conversion data for this goal. This is because the SubmitOrder page is part of a longer dynamic URL. To track this goal, we'll need to use a "regular expression" and enter the value "forward slash SubmitOrder" to indicate that the URL preceding it can be variable. Now, if we click "Re-verify," we can see that the conversion rate is more than zero, indicating that we will be able to track data. In an advanced Analytics course, we'll go over regular expressions in more detail.

#### **Goal Value**

If you want to assign a monetary value to the conversion goal, enable the "Value" option to "On" and enter the amount that each conversion is worth. You would only use this if each conversion was worth a consistent amount to your business. For example, if each newsletter sign-up was worth 1 dollar to your business, you could set a goal value equal to "1." We'll keep this Value set to "Off" for now since we're tracking Google Store order completions and each order is different. If we wanted to track actual revenue made from purchases, we would need to turn on eCommerce tracking, which we discuss in our Ecommerce Analytics course.

#### **Goal Funnel**

After you've verified your settings, turn the funnel switch to "On" to add funnel steps. Every funnel step represents an action that needs to be taken on your website to achieve the Goal. In this case, we’ll need to include a unique part of the URL for each page the user has to view in order to check out and make a purchase. Each step can be named, and the unique part of the URL can be added. If a step is required to complete the goal, move the "Required" toggle to "Yes." For example, if we only wanted users who enter the funnel on the first step to appear in our funnel visualization report, we would change the first step to "Required."

![Goal Funnel](https://r2.businesscrowd.co.uk/wp-content/uploads/2021/10/Goal-Funnel-300x285.png)

> Note that the Goal completion numbers in the Conversions report will not be affected by the funnel you’ve set up, even if you’ve made some of the steps required, as these steps are only reported in the funnel visualization report.

When you click Save, the Goal will appear in the Goals list.

Return to the Reporting tab and, under the "Conversions" reports, click "Goals" and then "Overview" to see your Goal metrics. More importantly, goal data can now be seen in almost all of your other Google Analytics reports, such as the Audience and Acquisition reports.

Click the Funnel Visualization report under Conversions to view the associated funnel visualization. By scrolling down, you can view user activity in each stage of the funnel, as well as how many users completed each step. If you see a significant decrease in user numbers during a certain phase, you should look into it more. This level of the funnel may be experiencing technical difficulties, stopping users from continuing.

![Goal Funnel Steps](https://r2.businesscrowd.co.uk/wp-content/uploads/2021/10/Goal-Funnel-Steps-300x281.png)

In addition to creating your own custom goals, the Analytics Solutions Gallery offers many Goals built by other users that you can add to your Analytics account to use for your own business purposes.