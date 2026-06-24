---
layout: "lesson"
title: "Acquisition Reports"
date: "2021-10-27"
status: "publish"
course_id: "96770"
original_url: "https://academy.lovetheidea.co.uk/courses/beginners-guide-to-google-analytics/lesson/acquisition-reports-4/"
---

#### **Acquisition reports overview**

**"Acquisition"** reports may be found in the left-hand navigation under the "Acquisition" section. The Acquisition reports allow you to evaluate the effectiveness of various marketing channels and determine which sources send you the highest quality traffic and conversions. This can assist you in making more informed choices about where to direct your marketing efforts.

Before we get into Acquisition reports, it's a good idea to understand how Google Analytics detects traffic sources for your website. When a user visits your site, the Google Analytics tracking code automatically collects several attributes (or dimensions) about the user's location. This includes the traffic medium, source, and name of the marketing campaign.

![Acquisition reports overview](https://academy.lovetheidea.co.uk/wp-content/uploads/2021/10/Acquisition-reports-overview-300x123.png)

You can think of the medium as the mechanism that delivered users to your site. Some common examples of mediums are **“organic,”** **“CPC,” “referral,” “email,”** and **“none.”** Let’s look at these different types of mediums:

-   **“Organic”** is used to identify traffic that arrived on your site through unpaid search like a non-paid Google Search result.
-   **“CPC”** indicates traffic that arrived through a paid search campaign like Google Ads text ads.
-   **“Referral”** is used for traffic that arrived on your site after the user clicked on a website other than a search engine.
-   **“Email”** represents traffic that came from an email marketing campaign.
-   **“(none)”** is applied for users that come directly to your site by typing your URL directly into a browser. In your reports, you will see these users have a source of **“direct”** with a medium of **“(none)”.**

**“Source”** provides more information about the medium. For example, if the medium is **“referral,”** then the source will be the URL of the website that referred the user to the site. If the medium is **“organic,”** then the source will be the name of the search engine such as **“google.”**

Under **“All Traffic”** let’s look at the **“Source/Medium”** report in The Google Store Analytics account using the dates August 1, 2015, through August 31, 2015. This shows the sources and their respective mediums sending referrals, search engine traffic, and direct traffic to the site. Notice that the default sort is users.

![Acquisition Reports](https://academy.lovetheidea.co.uk/wp-content/uploads/2021/10/Acquisition-Report-300x164.png)

To find successful traffic sources, we may look at the source/medium combinations with the most users, but this does not always imply that this was the best traffic. Ideally, traffic should be "high quality," which means that visitors who come from a source interact with the website or complete a transaction. The bounce rate is an excellent indication of traffic quality.

Our main traffic source is Google organic search, which has a low bounce rate when compared to other sources. Direct traffic is our second most common source of traffic. YouTube referrals were the third-largest traffic source but had one of the highest bounce rates. Let's conduct some additional research to see whether this is an issue.

We may enter the comparison view and choose the statistic "bounce rate" to compare the bounce rate for each source/medium combination to the site average. Sure enough, we can observe that our YouTube traffic is bouncing at a significantly greater rate than the site average. The Google Store may want to examine to ensure that YouTube traffic is arriving on a page that is useful to those consumers.

![Channel Report](https://academy.lovetheidea.co.uk/wp-content/uploads/2021/10/Behavior-Report-300x161.png)

If we want to see "organic" sources delivering traffic to the site, we may type "organic" into the filter. As can be seen, Google referred more traffic than any other non-paid source and had a comparatively low bounce rate when compared to other sources. This means that users who arrive through Google Organic search are landing on highly relevant sites.

By adjusting the filter to "google," we can now compare the performance of all of our different Google marketing efforts that produced traffic. We can now see that organic traffic was our most important traffic source, followed by google/CPC, which indicates sponsored search traffic through Google Ads. This is a fantastic approach to give context to your research and discover which marketing efforts are producing success for your company.

#### **Channels Report**

There are other methods for determining which traffic sources deliver the most engaged visitors to the site. We may examine traffic by channel using the "Channels" report, which groups the sources together under each medium. Organic, Social, Direct, Referral, Display, and other traffic sources are automatically classified into fundamental categories (or channels).

By clicking on a channel, you will be able to see the specific sources for that channel. If you wish to categorize your sources differently, you may do so in Google Analytics by creating your own channel groupings. In a later course, we'll go over this in more detail.

#### **Referrals Report**

If you want to view your traffic organized by which sites have linked to yours, you can look at the **“Referrals”** report.

You can even click into individual referrals to see which specific web pages link back to your site. If you want to understand which specific pages of your site are being linked to, you can add a secondary dimension of **“landing page”** to the report. This will show you which external sites are sending traffic to each of your specific pages, and potentially offer you a source of new advertising partnerships with those referring websites.