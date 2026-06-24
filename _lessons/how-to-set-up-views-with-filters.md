---
layout: "lesson"
title: "How to set up views with filters"
date: "2021-10-13"
status: "publish"
course_id: "96510"
original_url: "https://academy.lovetheidea.co.uk/courses/beginners-guide-to-google-analytics/lesson/hows-to-set-up-views-with-filters/"
---

To see what views are currently available for a property, click the “Admin” tab at the top.

![Hows to set up views with filters](https://academy.lovetheidea.co.uk/wp-content/uploads/2021/10/Google-Image-8-300x159.png)

Then, under View, click **“View Settings.”**

When you first build a property, Analytics creates an unfiltered view called "All Website Data," which you can see. This file provides all of the property's raw, unaltered data. Change the name to "Raw data'' so that you know the data hasn't been filtered. We'll simply type in the new name to change the name. Now click "Save."

![Set up views with filters](https://academy.lovetheidea.co.uk/wp-content/uploads/2021/10/Google-Image-9-300x254.png)

### **Setting up a Test View**

Next, we will set up a "test view" in order to validate our settings. If we set anything wrong, we may unintentionally lose the data we wish to gather. As a result, it's important to test all of our configurations in this test view first.

-   To set up a test view, at the top left, click the view selector pull-down menu.
-   Then select “Create new view.” We’ll name this view “Test View.”

 ![](https://academy.lovetheidea.co.uk/wp-content/uploads/2021/10/Google-Image-10-1-300x171.png)

-   Now click **“Create view.”**

![Setting up a Test View](https://academy.lovetheidea.co.uk/wp-content/uploads/2021/10/Google-Image-11-300x251.png)

Notice that we are now in the **“Test View”** for this property. We recommend adding a setting to the test view that filters your data for automated bot and spider traffic.

-   For this Test View, select **“View Settings."**
-   Then we’ll scroll down.
-   Under **“Bot Filtering,”** select **“Exclude all hits from known bots and spiders”.** This will help filter out bot traffic.

![Setting up a Test View Bot Filtering](https://academy.lovetheidea.co.uk/wp-content/uploads/2021/10/Google-Image-12-300x257.png)

-   Now click **“Save.”**

### **Creating a Master View**

Next, we'll create the Master view. This will be the view we use for all our reporting and analysis. We can simply copy and rename the test view.

-   To copy the view, in the top right corner click **“Copy view.”**

![Creating a Master View](https://academy.lovetheidea.co.uk/wp-content/uploads/2021/10/Google-Image-13-1-300x85.png)

-   We’ll rename the view **“Master View.”**
-   Now click **“Copy view.”**

If you go into the View menu, you will see that we have successfully copied and created this new view. By copying the view, all of our settings and filters we created like excluding bot traffic will also be included in the new view.

### **Adding Additional Filters**

Now we have three views that can be used to back up our data, test new analytics configurations, and do our daily reporting and analysis.

![Adding Additional Filters](https://academy.lovetheidea.co.uk/wp-content/uploads/2021/10/Google-Image-14-300x158.png)

But we still need to add filters to determine what data we want Analytics to display in each view. We’ll first set up a common filter on the “Test” view to exclude internal IP traffic. In this way, we can measure online Google Store behavior strictly for external customers, without any employee influence.

-   In the right-hand column under **“View,”** change the view selector from **“Master View”** to **“Test View.”** This will ensure we are creating our filters in the right view.
-   Now click **“Filters.”**

![Adding Additional Filters](https://academy.lovetheidea.co.uk/wp-content/uploads/2021/10/Google-Image-15-300x171.png)

-   Then click **“Add Filter.”** We’ll name this filter **“Exclude internal traffic.”**

**Analytic offers two types of filters:**

-    Predefined
-   Custom

The **predefined filters** are templates for the most common filters you will use. With **custom filters,** you can define your own criteria for including, excluding, or editing data. 

Since excluding IP address data is common, Analytics provides a predefined filter to do that, so we'll set the filter type to "Predefined."

-   Next, click **“Select Filter Type.”**

![Analytic two types of filters : Predefined and Custom](https://academy.lovetheidea.co.uk/wp-content/uploads/2021/10/Google-Image-16_-300x183.png)

-   Then select **“Exclude.”**
-   Now click **“Select source or destination”**

![Adding Additional Filters](https://academy.lovetheidea.co.uk/wp-content/uploads/2021/10/InkedGoogle-Image-17_LI-300x171.jpg)

-   And select **“traffic from the IP addresses.”**
-   Finally, click **“Select expression.”** And select **“that equal to.”**

![Creating a Master View](https://academy.lovetheidea.co.uk/wp-content/uploads/2021/10/Google-Image-18-300x181.png)

-   Now we’ll type in the IP address we want to exclude. You can find your public IP address by opening a new tab and searching for “what is my IP?” in Google.
-   Now we’ll copy the IP address into the IP address field.

![Adding Additional Filters](https://academy.lovetheidea.co.uk/wp-content/uploads/2021/10/InkedGoogle-Image-19_LI-300x156.jpg)

-   At the bottom, click “Save.”

Note that the filter we just created now shows up in the list of filters.

![Adding Additional Filters](https://academy.lovetheidea.co.uk/wp-content/uploads/2021/10/InkedGoogle-Image-20_LI-300x121.jpg)

Once we've saved our filter and applied it to a view, Google Analytics will exclude all traffic from the web property whose IP address matches our filter. The filter will take a while to capture all the traffic. If you want to test whether the filter excludes internal traffic, click Reporting. Then, In the left-hand navigation, click "Real-Time". After that, click "Overview."

![Adding Additional Filters](https://academy.lovetheidea.co.uk/wp-content/uploads/2021/10/Google-Image-21-300x160.png)

This shows you an overview of your website's traffic in real-time. If you’re on your internal network, you should notice that your internal user traffic should decline over the next 30 minutes. Once the filters have taken effect, Analytics won’t collect any internal activity for the IP address you filtered.

Once you’ve verified this filter is working in your test view, you can add it to your master view. Click on the Admin tab again. Then select the View pull-down menu.

![Adding Additional Filters](https://academy.lovetheidea.co.uk/wp-content/uploads/2021/10/InkedGoogle-Image-22_LI-300x141.jpg)

Select the **“Master View.”** Now click **“Filters.”** Then click **“Add Filter.”** Now, instead of **“Create new Filter,”** select the radio button for **“Apply existing Filter.”**

![Adding Additional Filters](https://academy.lovetheidea.co.uk/wp-content/uploads/2021/10/Google-Image-23-300x158.png)

This will allow you to select from a list of filters you’ve previously created. Click Save.

Now you can see that the filter is applied to the **“Master View.”**

![Adding Additional Filters](https://academy.lovetheidea.co.uk/wp-content/uploads/2021/10/InkedGoogle-Image-24_LI-300x108.jpg)

You should take note that multiple filters applied to a view will be applied in the order in which they appear in your filter settings. If you have two filters, the data will first go through the first filter, before it goes through the second. Be mindful of the order in which you apply your filters.

It's that simple to create or add filters to views to ensure you are collecting and protecting the data you need.