---
layout: "lesson"
title: "Understanding Full Reports"
date: "2021-10-14"
status: "publish"
course_id: "96510"
original_url: "https://academy.lovetheidea.co.uk/courses/beginners-guide-to-google-analytics/lesson/understanding-full-reports/"
---

### **Navigating full reports: Part 1**

#### **Introduction**

Previously, we showed you a high-level version of the **“Audience Overview”** report. At the bottom of that report, there’s a link to **“view full report,”** where you can see expanded versions of each Audience report in the left-hand navigation.

Now, let’s check out a full report.

If you open the full report, you'll see links underneath the segment picker that control the different types of data in the report. Te **“Summary”** view is a summary of the dimension categorized by Acquisition, Behavior, and Conversion metrics. This makes it easier to interpret these metrics in the context of the marketing funnel we discussed in Unit 1.

![Navigating full reports Part 1 Introduction](https://academy.lovetheidea.co.uk/wp-content/uploads/2021/10/Navigating-full-reports-Part-1-Introduction-300x154.png)

**"Site Usage"** shows metrics such as users, sessions per user, new users, sessions, pages per session, and average session duration. **"Goals"** will show metrics based on the number of goals you've set up, but only if you've set up goals in Google Analytics, which we'll discuss later. And **“Ecommerce”** will show you transaction metrics if you’ve set up eCommerce tracking in Analytics. Now let’s switch back to the Summary view.

Below the graph is the main data table. The first column represents the current dimension, "Country," which was the last demographic category we selected in the Overview report. You can switch between other dimensions like city, continent, and subcontinent by clicking the links above the data table. It’s important to know you can also add another dimension to the table for an even more specific analysis. We call this a secondary dimension, which is a common technique when analyzing data. For example, you could add a secondary dimension of **“device category”** to the Location report to see what kinds of devices were used by people in different countries while visiting your website.

![Location report](https://academy.lovetheidea.co.uk/wp-content/uploads/2021/10/Location-report-300x165.png)

Here you can see that each row of the table represents a different segment of traffic in the “Country” dimension. Please note that Analytics will only display the first 10 rows of information and the columns that will fit on the screen. To view additional rows, you can use the "Show rows" pulldown menu on the bottom-right side of the table to choose how many rows you want to see. You can also scroll through 10 rows at a time using the left and right arrows. If you want to view all the columns, you may have to use the horizontal scroll bar at the bottom of the report.

You can analyze the data table in different ways. By clicking on each column in the table, the data sorting can be toggled between ascending and descending. The arrow in the column header indicates which column you are currently sorting by. Note that by default, Analytics sorts this report by users.

It may also be helpful to filter the data table to focus only on the traffic segments that are significant. Use the filter field at the top of the table to include only rows where the main dimension includes your filter term. For example, if you want to look at data for a particular nation, such as India, rather than scrolling through the table, you can just enter "India" into the filter box, and Analytics will display you only data for segments that contain the word “India.” **“Advanced,”** next to the search box, lets you apply even more sophisticated rules for filtering. We’ll cover techniques for advanced filtering in an advanced course.

#### **Report Visualization**

-   Next to the **“advanced”** link, there are several different visualization options:
-   The “data table” view is the default visualization for most reports. This organizes your data in a table broken out by acquisition, behavior, and conversion metrics for the audience and acquisition reports.
-   The **“pie chart”** icon creates a pie chart based on your data. This helps you compare the percentages of a whole such as how many users are on desktops, tablets, and mobile phones. You can choose which metric from your report should display in the pie chart using the pulldown menu.
-   The **“performance”** view shows a bar graph of your data. This helps you compare individual segments side by side like which countries bring in the highest traffic. You can also use the pull-down menu to select various metrics to be represented as bars.
-   The **“comparison view”** shows you a bar graph to quickly see whether each entry in the table is performing above or below the site average for the selected metric. If the value for a given row is better than average, it appears green. If it’s below average, it appears red. Again, you can use the drop-down menu to select which metric should be displayed.
-   Finally, the **“Pivot”** view creates a pivot table in which both rows and columns can show different dimension values for comparison. For example, a pivot table could show The Google Store the bounce rate and the number of sessions for each landing page and device type.