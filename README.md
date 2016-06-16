![Rocket.Chat logo](https://pbs.twimg.com/profile_images/681798560346673152/QTKH08Ba_400x400.png)

# The Ultimate Open Source WebChat Platform

[![Rocket.Chat](https://demo.rocket.chat/images/join-chat.svg)](https://demo.rocket.chat/)
[![Build Status](https://img.shields.io/travis/RocketChat/Rocket.Chat/master.svg)](https://travis-ci.org/RocketChat/Rocket.Chat)
[![Codacy Badge](https://api.codacy.com/project/badge/grade/8580571ba024426d9649e9ab389bd5dd)](https://www.codacy.com/app/RocketChat/Rocket-Chat)
[![Coverage Status](https://coveralls.io/repos/RocketChat/Rocket.Chat/badge.svg)](https://coveralls.io/r/RocketChat/Rocket.Chat)
[![Code Climate](https://codeclimate.com/github/RocketChat/Rocket.Chat/badges/gpa.svg)](https://codeclimate.com/github/RocketChat/Rocket.Chat)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/RocketChat/Rocket.Chat/raw/master/LICENSE)

## Roadmap

#### In Progress
- XMPP Support via [Webhook bridge](https://github.com/saqura/xmppwb) [Issue #404](https://github.com/RocketChat/Rocket.Chat/issues/404)
- Federation via [matrix.org](https://www.matrix.org/), see [hubot-freddie](https://www.npmjs.com/package/hubot-freddie) and [Federation project](https://github.com/RocketChat/Rocket.Chat.Federation) : [Issue #520](https://github.com/RocketChat/Rocket.Chat/issues/520), [Issue #601](https://github.com/RocketChat/Rocket.Chat/issues/601)
- Support for PostgreSQL: [Issue #533](https://github.com/RocketChat/Rocket.Chat/issues/533), [Issue #822](https://github.com/RocketChat/Rocket.Chat/pull/822)
- Native iOS Application [Issue #270](https://github.com/RocketChat/Rocket.Chat/issues/270), [Rocket.Chat.iOS - HELP WANTED](https://github.com/RocketChat/Rocket.Chat.iOS)
- Native Android Application [Issue #271 - HELP WANTED](https://github.com/RocketChat/Rocket.Chat/issues/271)
- Off the Record Messaging [Issue #36](https://github.com/RocketChat/Rocket.Chat/issues/36), [Issue #268](https://github.com/RocketChat/Rocket.Chat/issues/268)
- Wordpress Plug-in  [Issue # 1920](https://github.com/RocketChat/Rocket.Chat/issues/1920)
- Drupal Plug-in [Issue # 1921](https://github.com/RocketChat/Rocket.Chat/issues/1921)
- Integration with PSTN (telephone networks)
- API-enabled methods: [Issue #202](https://github.com/RocketChat/Rocket.Chat/issues/202), [Issue #454](https://github.com/RocketChat/Rocket.Chat/issues/454), [Issue #455](https://github.com/RocketChat/Rocket.Chat/issues/455), [Issue #759](https://github.com/RocketChat/Rocket.Chat/issues/759)
- Scalable WebRTC broadcaster / media-server integration, [Issue #1118](https://github.com/RocketChat/Rocket.Chat/issues/1118)
- White label hosting
- Reseller support for white label hosting
- CRM integrations: Microsoft Dynamics CRM,  Salesforce.com, Zoho.com, SugarCRM, SuiteCRM and more
- Support multiple teams on the same instance / same VPS infrastructure: [Issue #658](https://github.com/RocketChat/Rocket.Chat/issues/658), [Issue #630](https://github.com/RocketChat/Rocket.Chat/issues/630)

#### Planned
- Kerberos Authentication: [Issue #839](https://github.com/RocketChat/Rocket.Chat/issues/839)
- More webhooks: GitLab, Confluence, Jira, Piwik, Wordpress: [Issue #233](https://github.com/RocketChat/Rocket.Chat/issues/233), [Issue #525](https://github.com/RocketChat/Rocket.Chat/issues/525), [Issue #637](https://github.com/RocketChat/Rocket.Chat/issues/637), [Issue #638](https://github.com/RocketChat/Rocket.Chat/issues/638), [Issue #747](https://github.com/RocketChat/Rocket.Chat/issues/747)
- Anonymous use of Rocket.Chat: [Issue #604](https://github.com/RocketChat/Rocket.Chat/issues/604)
- File Sharing via P2P: [Issue #369](https://github.com/RocketChat/Rocket.Chat/issues/369), [Issue #370](https://github.com/RocketChat/Rocket.Chat/issues/370)
- Anti-virus checking on file uploads: [Issue #757](https://github.com/RocketChat/Rocket.Chat/issues/757)

## How it all started

Read about [how it all started](http://osdelivers.blackducksoftware.com/2016/06/10/rocket-chat-hosted-chat-services/).

## Awards

[![Black Duck Open Source Rookie of the Year](https://raw.githubusercontent.com/Sing-Li/bbug/master/images/blackducksm.png)](https://www2.blackducksoftware.com/news/releases/black-duck-announces-open-source-rookies-of-the-year)

## Issues

[Github Issues](https://github.com/RocketChat/Rocket.Chat/issues) are used to track todos, bugs, feature requests, and more.

### Stack Overflow

Please use the [Stack Overflow TAG](http://stackoverflow.com/questions/tagged/rocket.chat)

## Integrations

#### Hubot

The docker image is ready.
Everyone can start hacking the adapter code, or launch his/her own bot within a few minutes now.
Please head over to the [Hubot Integration Project](https://github.com/RocketChat/hubot-rocketchat) for more information.


#### Chat-ops integrations powered by Hubot

Integrate your application with fly-in panels today!   Early access is available for developers.

![Sample integration of a Drones Fleet Management System](https://raw.githubusercontent.com/Sing-Li/bbug/master/images/dronechatops.png)

#### Many, many, many more to come!

We are developing the APIs based on the competition, so stay tuned and you will see a lot happening here.

## Documentation

Checkout [Rocket.Chat documentation](https://rocket.chat/docs/)

## License

Note that Rocket.Chat is distributed under the [MIT License](http://opensource.org/licenses/MIT).

# Development

## Quick start for code developers
Prerequisites:

* [Git](http://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
* [Meteor](https://www.meteor.com/install)

Now just clone and start the app:

```sh
git clone https://github.com/RocketChat/Rocket.Chat.git
cd Rocket.Chat
meteor
```

If you are not a developer and just want to run the server - see [deployment methods](https://rocket.chat/docs/master/installing-and-updating/deployment-options).

## Branching Model

See [Branches and Releases](https://rocket.chat/docs/master/developer-guides/branches-and-releases).

It is based on [Gitflow Workflow](http://nvie.com/posts/a-successful-git-branching-model/), reference section below is derived from Vincent Driessen at nvie.

See also this [Git Workflows Comparison](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) for more details.

## Translations
We are experimenting [Lingohub](https://translate.lingohub.com/engelgabriel/rocket-dot-chat/dashboard).
If you want to help, send an email to support at rocket.chat to be invited to the translation project.

## Community

Join thousands of members  world-wide 24 x 7 in our [community server](https://demo.rocket.chat).  Join the conversation at [Twitter](https://twitter.com/RocketChatApp), [Facebook](https://www.facebook.com/RocketChatApp) or [Google Plus](https://plus.google.com/+RocketChatApp)

## How to Contribute

Already a JavaScript developer?  Familiar with Meteor?  [Pick an issue](https://github.com/RocketChat/Rocket.Chat/labels/contrib%3A%20easy), push a PR and instantly become a member of Rocket.Chat's international contributors community.

A lot of work has already gone into Rocket.Chat, but we have much bigger plans for it!


# Credits

Thanks to
[Aaron Ogle](https://github.com/geekgonecrazy),
[Bradley Hilton](https://github.com/Graywolf336),
[Diego Sampaio](https://github.com/sampaiodiego),
[Gabriel Engel](https://github.com/engelgabriel),
[George Secrieru](https://github.com/gmsecrieru),
[Marcelo Schmidt](https://github.com/marceloschmidt),
[Rafael Caferati](https://github.com/rcaferati),
[Rodrigo Nascimento](https://github.com/rodrigok),
[Sing Li](https://github.com/Sing-Li),
and many others.

Emoji provided free by [Emoji One](http://emojione.com)

Performance monitoring provided by [Kadira](https://kadira.io)

Hosting powered by [Rackspace](https://rackspace.com)

# Donate

Rocket.Chat will be free forever, but you can help us speed-up the development!

[![Donate](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=ZL94ZE6LGVUSN)

[BountySource](https://www.bountysource.com/teams/rocketchat)
