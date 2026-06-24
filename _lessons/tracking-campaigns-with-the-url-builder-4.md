---
layout: "lesson"
title: "Tracking campaigns with the URL Builder"
date: "2021-10-27"
status: "publish"
course_id: "96770"
original_url: "https://academy.lovetheidea.co.uk/courses/beginners-guide-to-google-analytics/lesson/tracking-campaigns-with-the-url-builder-4/"
---

#### **Tracking campaigns with URL Builder**

In the first step, enter your website's URL (or where you want your ad or campaign link to take users). Then fill out the campaign, source, and medium fields. If you want, you can fill out the fields for term, content, and name. Term, content, and name can be any values you want; just make sure they're descriptive enough to identify when they appear in your Google Analytics reports.

![Tracking campaigns with URL Builder](https://academy.lovetheidea.co.uk/wp-content/uploads/2021/10/Tracking-campaigns-with-URL-Builder-300x253.png)

**A quick note about naming conventions.** Typically, you'll name your tags with single words. If you use phrases, the URL builder will add underscores between the words to avoid spaces in the URL. When entering tag values, use consistent spelling and capitalization. Since Google Analytics is case sensitive, a campaign named "PROMO1" in all uppercase will appear separately from a campaign named "promo1" in all lowercase. Also, make sure to use consistent medium names, like "display" for banner advertisements and "email" for email campaigns.

When you click **“Generate URL”** at the bottom, you can see that the URL Builder generates the link with all the correct campaign parameters attached.

![A quick note about naming conventions. ](https://academy.lovetheidea.co.uk/wp-content/uploads/2021/10/A-quick-note-about-naming-conventions.-300x70.png)

This provides an easy way to quickly generate campaign tags for tracking. But keep in mind, you can only use it to build out one URL at a time, so you probably won’t want to use it to build each URL if you have a large campaign. Instead, you can use a spreadsheet to simplify the process. We’ve provided an example template at the end of this lesson that you can use to manage your campaign values for bulk URL-building.

Before launching a campaign with this link, you’ll want to verify that your tracking tags are working correctly. Sometimes a website configuration can break Google Analytics Campaign tracking. Here's a simple way to test your campaign before you launch it. First, open an incognito window or private browsing session. Then, copy and paste the link you created to track your campaign into the address bar of the browser. Once your website loads, navigate around your site and complete some of the critical actions. For example, if one of your website objectives is trial signup, complete the signup process on your site. Or, if your campaign contains a coupon, try submitting a transaction with the coupon applied.

![quick note about naming conventions.](https://academy.lovetheidea.co.uk/wp-content/uploads/2021/10/WhatsApp-Image-2021-10-14-at-11.59.17-PM-243x300.jpeg)

It's a good idea to try this with each URL you've created. You can see campaign information in Real-Time reports right away, or you can wait a few hours to examine the data in your regular Campaign reports. Then, under "Campaigns," go to the "All Campaigns" report in the "Acquisition" section. This report allows you to compare incoming traffic from different marketing campaigns. Enter the campaign's name into the filter to ensure that it is collecting data correctly. You should see an overview of the campaign clicks you tested.

You can view the source and medium data that you entered into the URL Builder by clicking on the campaign name. Add a secondary dimension such as "ad content" to your URL if you want to verify the other campaign tags you added.

This allows you to see the primary dimension of "Source/Medium" as it is broken down by the "content" tag you added to your links. The Google Store distinguished the "content" tag for their email newsletters based on whether or not they were providing deals. We can see which promotions were most effective at driving visitors to the website by including a secondary dimension "Ad Content."

There are many additional ways to analyze campaign data that will be covered in a more advanced course. You can quickly understand which campaigns drove the highest quality traffic to your site using the URL Builder in conjunction with Google Analytics reporting.