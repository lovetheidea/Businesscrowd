---
layout: "lesson"
title: "Google Analytics set up"
date: "2021-10-13"
status: "publish"
course_id: "96510"
original_url: "https://academy.lovetheidea.co.uk/courses/beginners-guide-to-google-analytics/lesson/google-analytics-set-up/"
---

## **The Analytics Account Structure**

Now that you know how data gets collected, let’s look at how Google Analytics accounts are organized.

All of your Google Analytics accounts can be grouped under an “Organization,” which is optional. By doing this, you can manage multiple Google Analytics accounts in one place.

![The Analytics Account Structure](https://academy.lovetheidea.co.uk/wp-content/uploads/2021/10/Google-Image-4-300x158.png)

Large companies or agencies may have several accounts, while medium-sized businesses or agencies usually have one account. When you create an account, you also automatically create a property and, within that property, a view for that account. However, each Analytics account can have multiple properties and each property can have multiple views. In this way, you can organize your Analytics data collection to best suit your business needs.

The Google Analytics Account controls how data is collected from your website and who can access it. Typically, you would create separate Analytics accounts for distinct businesses or business units.

Each Google Analytics account has at least one "property." Each property can collect data independently through a unique tracking ID that appears in your tracking code.

You may assign multiple properties to each account, so you can collect data from different websites, mobile applications, or other digital assets associated with your business. For example, you may want to have different properties for different sales regions or brands. This allows you to easily view the data for an individual part of your business, but keep in mind this won’t allow you to see data from separate properties in aggregate.

### **View Settings**

Just as each account can have multiple “properties,” each property can have multiple “views.” You can use a feature called Filters in your configuration settings to determine what data you want to include in the reports for each using this method, you can easily view data for all aspects of your business, but this does not allow you to see data from different properties in aggregate.

![The Analytics account structure | View Settings](https://academy.lovetheidea.co.uk/wp-content/uploads/2021/10/Google-Image-5-300x158.png)

The Google Store, for example, sells products from their website to people in different parts of the world. They could develop a single display that contained all of the data from their global website. They could establish different views for North America, Europe, and Asia if they wanted to see data for certain regions. The Google Store could put up a view that filtered out internal traffic based on IP address if they only wanted to see data for external traffic (not including their own store personnel).

You can also set Google Analytics "Goals" at the view level. Goals are a great way to keep track of your website's conversions, or business objectives. A target could be the number of people that joined up for an email list or bought a product. In a subsequent session, we'll talk about goals and conversions. Because you can't edit data once it's been collected and processed, be careful while setting up your accounts, properties, and views. 

![The Analytics account structure](https://academy.lovetheidea.co.uk/wp-content/uploads/2021/10/Google-Image-6-300x157.png)

Before we move on to user access permissions, there are a couple of important things to note about views: 

1.  New views only include data from the date the view was created and onwards. When you create a new view, it will not include past data.
2.  If you delete a view, only administrators can recover that view within a limited amount of time. Otherwise, the view will be permanently deleted.

### **User Permissions**

At the account, property, or view level, you can assign permissions to other users. The permissions of the level above it are passed down to each subsequent level.

If you have access to an account, you also have access to the properties and views under that account. If you simply have view access permissions, you won't be able to change the property or account associated with that view.

You can set user roles for "Administrator," "Editor," "Analyst," and "Viewer" by clicking "Admin."

-   **“Administrator”** allows users to add or remove user access to an account, property, or view.
-   **“Editor”** allows users to modify configuration settings.
-   **“Analyst”** lets users share things like dashboards and measurement settings.
-   And finally, **"Viewer"** allows users to view data, analyze reports, and create dashboards, but restricts them from modifying settings or adding new users.

![User Permissions](https://academy.lovetheidea.co.uk/wp-content/uploads/2021/10/Google-Image-7-1-300x178.png)

The way your organizations, accounts, properties, and views are configured can have an impact on how your data is gathered. Make sure your properties and views of the data you collect correspond with your overall business structure when setting up your Google Analytics setup.