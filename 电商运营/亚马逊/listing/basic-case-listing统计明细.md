---
type: note
title: Basic Case Listing 统计明细
format: reference
origin: codex-conversation
status: active
aliases:
  - Basic Case Listing 统计明细
created: '2026-09-23'
subtype: comparison
updated: '2026-09-23'
verified: '2026-09-23'
ingested_via: 'mcp:put_page'
ingested_at: '2026-09-23T04:00:05.990Z'
source_kind: 'mcp:put_page'
tags:
  - amazon
  - basic-case
  - corpus-analysis
  - listing
---

# Basic Case Listing 统计明细

[返回统计知识库](basic-case-listing统计知识库.md)

主口径为 100 条 BSR 记录和 529 个五点区段段落，标签口径为 489 段。词频不等于搜索量；否定句也会产生词频。数据日期、缺失字段和编码规则见主文。

<a id="toc"></a>
## 目录

- [目录](#toc)
- [标题词频 前四十项](#title-frequency)
- [五点标签与正文内容词 前六十项](#all-bullet-frequency)
- [仅正文内容词 前四十项](#body-frequency)
- [相邻双词组 前四十项](#phrase-frequency)
- [标签单词 前三十项](#label-word-frequency)
- [完整标签清单](#full-labels)
- [品牌模板与长度](#brand-statistics)
- [去重敏感性对照](#deduplicated)
- [首条主任务编码来源](#first-point-coding)
- [提取与编码校核](#quality-notes)

<a id="title-frequency"></a>
## 标题词频 前四十项

标题表的段落覆盖等于标题覆盖，分母为 100。

| 词项或词组 | 总次数 TF | 段落覆盖 | 商品记录覆盖 /100 | 已识别品牌覆盖 |
| --- | --- | --- | --- | --- |
| case | 127 | 100 | 100 | 50 |
| iphone | 97 | 82 | 82 | 47 |
| pro | 54 | 50 | 50 | 31 |
| magnetic | 36 | 36 | 36 | 21 |
| black | 35 | 35 | 35 | 18 |
| max | 32 | 30 | 30 | 23 |
| phone | 29 | 28 | 28 | 19 |
| magsafe | 28 | 27 | 27 | 20 |
| shockproof | 23 | 23 | 23 | 15 |
| compatible | 21 | 20 | 20 | 17 |
| galaxy | 19 | 18 | 18 | 9 |
| camera | 18 | 18 | 18 | 11 |
| clear | 18 | 16 | 16 | 12 |
| protection | 17 | 17 | 17 | 14 |
| cover | 16 | 15 | 15 | 13 |
| slim | 16 | 16 | 16 | 15 |
| pink | 15 | 15 | 15 | 12 |
| samsung | 15 | 13 | 13 | 8 |
| military | 13 | 13 | 13 | 12 |
| anti | 12 | 12 | 12 | 10 |
| protector | 12 | 11 | 11 | 8 |
| grade | 11 | 11 | 11 | 10 |
| otterbox | 11 | 11 | 11 | 1 |
| screen | 11 | 11 | 11 | 8 |
| series | 11 | 11 | 11 | 1 |
| matte | 10 | 10 | 10 | 8 |
| blue | 9 | 9 | 9 | 3 |
| control | 9 | 9 | 9 | 5 |
| cute | 9 | 9 | 9 | 5 |
| 17e | 8 | 8 | 8 | 8 |
| built | 8 | 8 | 8 | 4 |
| drop | 8 | 8 | 8 | 7 |
| s26 | 8 | 8 | 8 | 6 |
| stand | 8 | 8 | 8 | 6 |
| 16e | 7 | 7 | 7 | 7 |
| a17 | 7 | 6 | 6 | 4 |
| bumper | 7 | 7 | 7 | 6 |
| protective | 7 | 7 | 7 | 7 |
| silicone | 7 | 7 | 7 | 6 |
| torras | 7 | 7 | 7 | 1 |

<a id="all-bullet-frequency"></a>
## 五点标签与正文内容词 前六十项

| 词项或词组 | 总次数 TF | 段落覆盖 | 商品记录覆盖 /100 | 已识别品牌覆盖 |
| --- | --- | --- | --- | --- |
| protection | 233 | 162 | 94 | 46 |
| camera | 190 | 127 | 80 | 46 |
| magnetic | 140 | 73 | 54 | 31 |
| screen | 129 | 88 | 67 | 40 |
| charging | 106 | 84 | 77 | 44 |
| drop | 90 | 76 | 67 | 35 |
| back | 88 | 74 | 55 | 35 |
| built | 86 | 79 | 51 | 27 |
| raised | 83 | 69 | 62 | 37 |
| wireless | 83 | 72 | 67 | 41 |
| magsafe | 76 | 57 | 51 | 28 |
| grip | 75 | 68 | 57 | 33 |
| tpu | 74 | 69 | 54 | 30 |
| easy | 69 | 60 | 42 | 32 |
| military | 69 | 58 | 52 | 21 |
| scratches | 68 | 68 | 59 | 31 |
| slim | 64 | 54 | 50 | 27 |
| grade | 59 | 56 | 45 | 21 |
| matte | 59 | 38 | 31 | 18 |
| shock | 55 | 49 | 46 | 22 |
| buttons | 54 | 43 | 39 | 25 |
| anti | 53 | 36 | 30 | 21 |
| lens | 53 | 40 | 33 | 24 |
| protector | 53 | 30 | 25 | 14 |
| layer | 52 | 40 | 34 | 18 |
| comfortable | 51 | 46 | 40 | 24 |
| drops | 50 | 50 | 44 | 24 |
| features | 50 | 50 | 38 | 23 |
| edges | 48 | 47 | 40 | 25 |
| free | 48 | 44 | 28 | 19 |
| perfect | 48 | 46 | 42 | 25 |
| quality | 47 | 42 | 33 | 16 |
| accessories | 46 | 42 | 41 | 30 |
| full | 46 | 34 | 27 | 18 |
| secure | 45 | 44 | 36 | 17 |
| soft | 45 | 43 | 35 | 26 |
| car | 44 | 43 | 40 | 25 |
| precise | 44 | 36 | 35 | 26 |
| daily | 41 | 38 | 27 | 15 |
| touch | 40 | 39 | 34 | 22 |
| magnets | 39 | 36 | 35 | 19 |
| pc | 39 | 36 | 32 | 19 |
| support | 39 | 32 | 27 | 17 |
| protect | 38 | 36 | 32 | 21 |
| strong | 37 | 31 | 25 | 18 |
| cutouts | 36 | 33 | 33 | 23 |
| durable | 36 | 36 | 32 | 18 |
| perfectly | 36 | 36 | 33 | 22 |
| ring | 36 | 31 | 25 | 16 |
| translucent | 36 | 26 | 24 | 15 |
| chargers | 35 | 30 | 30 | 21 |
| please | 35 | 28 | 26 | 17 |
| access | 34 | 33 | 32 | 24 |
| against | 34 | 33 | 30 | 17 |
| effectively | 34 | 33 | 29 | 19 |
| model | 34 | 28 | 28 | 17 |
| mounts | 34 | 33 | 30 | 20 |
| offers | 34 | 33 | 31 | 15 |
| safe | 34 | 31 | 25 | 15 |
| stand | 34 | 23 | 15 | 9 |

<a id="body-frequency"></a>
## 仅正文内容词 前四十项

| 词项或词组 | 总次数 TF | 段落覆盖 | 商品记录覆盖 /100 | 已识别品牌覆盖 |
| --- | --- | --- | --- | --- |
| camera | 157 | 124 | 78 | 45 |
| protection | 141 | 125 | 76 | 37 |
| screen | 105 | 83 | 64 | 39 |
| magnetic | 100 | 62 | 43 | 26 |
| charging | 97 | 83 | 76 | 44 |
| back | 80 | 70 | 51 | 34 |
| wireless | 79 | 71 | 66 | 41 |
| raised | 78 | 68 | 61 | 36 |
| built | 77 | 76 | 51 | 27 |
| tpu | 72 | 69 | 54 | 30 |
| scratches | 68 | 68 | 59 | 31 |
| easy | 67 | 58 | 41 | 32 |
| magsafe | 63 | 55 | 49 | 28 |
| drop | 61 | 58 | 53 | 28 |
| grip | 61 | 61 | 51 | 31 |
| buttons | 51 | 43 | 39 | 25 |
| drops | 50 | 50 | 44 | 24 |
| lens | 49 | 40 | 33 | 24 |
| edges | 48 | 47 | 40 | 25 |
| features | 48 | 48 | 36 | 22 |
| shock | 48 | 42 | 39 | 19 |
| comfortable | 47 | 45 | 39 | 23 |
| soft | 45 | 43 | 35 | 26 |
| car | 44 | 43 | 40 | 25 |
| matte | 44 | 36 | 30 | 17 |
| slim | 44 | 44 | 41 | 23 |
| accessories | 42 | 42 | 41 | 30 |
| daily | 41 | 38 | 27 | 15 |
| layer | 41 | 36 | 30 | 17 |
| free | 39 | 39 | 27 | 18 |
| magnets | 39 | 36 | 35 | 19 |
| pc | 39 | 36 | 32 | 19 |
| secure | 39 | 39 | 32 | 16 |
| protector | 38 | 27 | 23 | 13 |
| touch | 38 | 37 | 32 | 21 |
| protect | 37 | 35 | 31 | 21 |
| anti | 36 | 28 | 24 | 18 |
| perfectly | 36 | 36 | 33 | 22 |
| chargers | 35 | 30 | 30 | 21 |
| military | 35 | 34 | 32 | 15 |

<a id="phrase-frequency"></a>
## 相邻双词组 前四十项

| 词项或词组 | 总次数 TF | 段落覆盖 | 商品记录覆盖 /100 | 已识别品牌覆盖 |
| --- | --- | --- | --- | --- |
| wireless charging | 65 | 60 | 60 | 35 |
| military grade | 47 | 45 | 41 | 18 |
| screen protector | 40 | 23 | 19 | 10 |
| drop protection | 37 | 36 | 33 | 20 |
| car mounts | 33 | 33 | 30 | 20 |
| tempered glass | 27 | 22 | 21 | 11 |
| camera control | 26 | 18 | 17 | 9 |
| camera lens | 24 | 20 | 17 | 13 |
| grade drop | 24 | 23 | 23 | 14 |
| pc back | 24 | 22 | 19 | 13 |
| precise cutouts | 24 | 22 | 22 | 18 |
| shock absorbing | 24 | 24 | 23 | 10 |
| easy access | 22 | 22 | 21 | 15 |
| glass screen | 21 | 17 | 16 | 9 |
| comfortable grip | 20 | 20 | 20 | 13 |
| dual layer | 20 | 20 | 15 | 7 |
| magsafe accessories | 20 | 20 | 20 | 14 |
| hard pc | 19 | 19 | 17 | 10 |
| non slip | 19 | 18 | 18 | 13 |
| mm raised | 18 | 12 | 12 | 8 |
| raised edges | 18 | 18 | 18 | 14 |
| magnetic ring | 17 | 15 | 12 | 7 |
| camera protection | 16 | 15 | 15 | 12 |
| strong magnetic | 16 | 16 | 14 | 10 |
| flexible tpu | 15 | 15 | 15 | 10 |
| hands free | 15 | 15 | 14 | 9 |
| 1.5 mm | 14 | 12 | 12 | 7 |
| magnetic accessories | 14 | 13 | 13 | 11 |
| control button | 13 | 12 | 12 | 7 |
| extra protection | 13 | 11 | 11 | 8 |
| military drop | 13 | 12 | 12 | 5 |
| secure grip | 13 | 13 | 13 | 8 |
| tpu frame | 13 | 13 | 13 | 9 |
| translucent back | 13 | 13 | 12 | 6 |
| translucent matte | 13 | 11 | 10 | 8 |
| z fold | 13 | 12 | 3 | 3 |
| absorbing tpu | 12 | 12 | 12 | 5 |
| anti fingerprint | 12 | 12 | 12 | 10 |
| high quality | 12 | 12 | 12 | 8 |
| magnetic attraction | 12 | 10 | 10 | 6 |

<a id="label-word-frequency"></a>
## 标签单词 前三十项

| 词项或词组 | 总次数 TF | 段落覆盖 | 商品记录覆盖 /100 | 已识别品牌覆盖 |
| --- | --- | --- | --- | --- |
| protection | 92 | 92 | 75 | 42 |
| magnetic | 40 | 40 | 40 | 23 |
| compatibility | 39 | 39 | 38 | 22 |
| military | 34 | 34 | 34 | 16 |
| camera | 33 | 33 | 33 | 26 |
| grade | 31 | 31 | 31 | 17 |
| drop | 29 | 29 | 29 | 18 |
| screen | 24 | 24 | 23 | 14 |
| fit | 23 | 23 | 23 | 11 |
| compatible | 22 | 22 | 22 | 17 |
| perfect | 20 | 20 | 20 | 12 |
| slim | 20 | 20 | 20 | 13 |
| anti | 17 | 13 | 12 | 7 |
| strong | 17 | 17 | 17 | 12 |
| friendly | 15 | 15 | 15 | 9 |
| full | 15 | 15 | 15 | 11 |
| matte | 15 | 15 | 15 | 11 |
| protector | 15 | 15 | 15 | 7 |
| grip | 14 | 14 | 14 | 10 |
| iphone | 14 | 12 | 12 | 8 |
| quality | 14 | 14 | 14 | 7 |
| magsafe | 13 | 13 | 13 | 10 |
| precise | 13 | 13 | 13 | 11 |
| support | 13 | 13 | 12 | 6 |
| translucent | 13 | 13 | 13 | 9 |
| trusted | 12 | 12 | 12 | 2 |
| case | 11 | 10 | 10 | 4 |
| kickstand | 11 | 11 | 11 | 6 |
| layer | 11 | 11 | 11 | 5 |
| precision | 11 | 11 | 11 | 4 |

<a id="full-labels"></a>
## 完整标签清单

大小写与空白归一后分组；不把意思近似的标签强行合并。名次为来源定位。

| 标签 | 次数 | 名次 | 已识别品牌数 |
| --- | --- | --- | --- |
| Compatibility | 22 | 1, 2, 3, 5, 12, 14, 17, 18, 23, 31, 33, 37, 52, 55, 56, 60, 62, 70, 73, 87, 92, 93 | 12 |
| Perfect Compatibility | 6 | 7, 11, 30, 43, 64, 68 | 4 |
| PRECISION FIT | 5 | 9, 19, 53, 59, 69 | 1 |
| Trusted OtterBox Quality | 5 | 20, 27, 53, 57, 69 | 1 |
| Anti-Scratch & Anti-fingerprint | 4 | 29, 43, 49, 77 | 3 |
| Compatible Model | 4 | 41, 67, 81, 86 | 2 |
| Full Body Protection | 4 | 41, 42, 70, 86 | 3 |
| Military-Grade Drop Protection | 4 | 3, 4, 62, 95 | 3 |
| Precise cutouts | 4 | 16, 25, 66, 76 | 3 |
| Shock Protection | 4 | 1, 18, 34, 40 | 3 |
| Strong Magnetic Attraction | 4 | 12, 18, 29, 84 | 3 |
| THE MOST TRUSTED PHONE CASE BRAND | 4 | 9, 19, 46, 75 | 1 |
| Tempered Glass Screen Protector | 4 | 12, 14, 31, 84 | 2 |
| 10FT Military-Grade Drop Protection | 3 | 32, 47, 51 | 2 |
| Built in Metal Kickstand | 3 | 26, 44, 63 | 1 |
| CAMERA CONTROL | 3 | 8, 88, 89 | 2 |
| Comfortable Grip | 3 | 15, 41, 86 | 2 |
| Complete Customer Support | 3 | 3, 10, 62 | 1 |
| Dual Layer Protection | 3 | 26, 44, 63 | 1 |
| Durable and Delicate Phone Case | 3 | 26, 44, 63 | 1 |
| Free Screen Protector | 3 | 26, 44, 63 | 1 |
| Matte Translucent Back | 3 | 1, 18, 55 | 1 |
| Military-Grade Protection | 3 | 25, 35, 38 | 3 |
| Stronger Magnetic Lock | 3 | 3, 10, 62 | 1 |
| Translucent Matte Back | 3 | 12, 14, 34 | 2 |
| Unique Camera Window | 3 | 26, 44, 63 | 1 |
| 14FT Military Grade Drop Protection | 2 | 12, 14 | 1 |
| 20FT Military-Grade Drop Tested | 2 | 52, 73 | 1 |
| 3X MILITARY‑GRADE DROP PROTECTION | 2 | 27, 59 | 1 |
| ATTENTION:Only for iPhone 15 Pro 6.1 inch | 2 | 49, 77 | 1 |
| Anti-Yellowing | 2 | 3, 10 | 1 |
| Built-in Screen Protector | 2 | 52, 73 | 1 |
| Check your phone model | 2 | 1, 55 | 1 |
| Compatible Models | 2 | 54, 98 | 2 |
| Compatible for | 2 | 16, 66 | 1 |
| Compatible with Magsafe & Magnetic | 2 | 17, 23 | 1 |
| DESIGNED BY APPLE | 2 | 8, 89 | 1 |
| Easy to Clean | 2 | 74, 93 | 1 |
| Eco-Friendly | 2 | 12, 14 | 1 |
| Extra Protection | 2 | 33, 60 | 1 |
| Inside & Outside Double Shields Design | 2 | 49, 77 | 1 |
| LIGHTWEIGHT AND SMOOTH | 2 | 8, 89 | 1 |
| Lifetime Replacement | 2 | 7, 43 | 2 |
| MAGNETIC FAST CHARGE | 2 | 53, 69 | 1 |
| MAGSAFE CHARGING COMPATIBLE | 2 | 8, 89 | 1 |
| Metal Camera Frame & Buttons | 2 | 49, 77 | 1 |
| Military Grade Protection | 2 | 41, 86 | 1 |
| No Magnetic Function | 2 | 33, 60 | 1 |
| Perfect Fit & Lifetime Replacement | 2 | 49, 77 | 1 |
| Perfect Fit & Professional Support | 2 | 48, 65 | 1 |
| Powerful & Upgrade Magnet | 2 | 49, 77 | 1 |
| Precise Cutting | 2 | 41, 86 | 1 |
| Premium Finish. Exceptional Feel | 2 | 48, 65 | 1 |
| Premium Material | 2 | 67, 91 | 1 |
| Premium Touch Feel | 2 | 47, 51 | 1 |
| QUALITY YOU CAN COUNT ON | 2 | 24, 59 | 1 |
| SCRATCH AND DROP PROTECTION | 2 | 8, 89 | 1 |
| Screen Protector included | 2 | 17, 23 | 1 |
| Screen and Camera Protection | 2 | 76, 78 | 2 |
| Slim Minimalist Design | 2 | 48, 65 | 1 |
| Strong Magnetic Charging | 2 | 14, 39 | 2 |
| Strongest Magnetic Lock & Charges Fast | 2 | 48, 65 | 1 |
| Super Magnetic Attraction | 2 | 1, 55 | 1 |
| Super Strong Magnetic Lock | 2 | 25, 56 | 2 |
| Trusted 12FT Military Grade Protection | 2 | 48, 65 | 1 |
| Trustworthy Protection | 2 | 17, 23 | 1 |
| Trustworthy Quality | 2 | 33, 60 | 1 |
| Ultimate Protection: Four Corners & TPU Strips | 2 | 47, 51 | 1 |
| Unmatched fit MagSafe Compatibility | 2 | 47, 51 | 1 |
| Upgraded Full Coverage Camera Protection | 2 | 11, 56 | 2 |
| User-Friendly | 2 | 33, 60 | 1 |
| Versatile Use & Ideal Gift | 2 | 12, 14 | 1 |
| 100% Crystal Clear & 3X Anti-Yellow | 1 | 99 | 1 |
| 12FT Drop Protection | 1 | 28 | 1 |
| 12FT Military-Grade Drop Protection | 1 | 97 | 0 |
| 2100GS Super Magnetic | 1 | 15 | 1 |
| 360 Rotatable Ring Kickstand | 1 | 84 | 1 |
| 360 Screen Defense with Tempered Glass | 1 | 2 | 1 |
| 360° Camera Armor | 1 | 68 | 1 |
| 360° ROTATING STAND | 1 | 88 | 1 |
| 360° Rotating & 120° Folding Ring Stand | 1 | 21 | 1 |
| 3X Military Drop Protection | 1 | 10 | 1 |
| 7-Year Craftsmanship & Over 7 Upgrades | 1 | 5 | 1 |
| 7X MILITARY‑STANDARD DEFENSE | 1 | 69 | 1 |
| 9H Tempered Glass Screen Protector | 1 | 28 | 1 |
| Absolute Precise Cutouts | 1 | 35 | 1 |
| Adjustable Stash Stand | 1 | 62 | 1 |
| Adjustable kickstand | 1 | 37 | 1 |
| Aesthetic Design | 1 | 54 | 1 |
| Aesthetic Pattern | 1 | 87 | 1 |
| Aesthetically Designed & Customizable Style | 1 | 5 | 1 |
| All-Scenario Versatility | 1 | 2 | 1 |
| Anti-Fingerprints & Dirt-resistant | 1 | 64 | 0 |
| Anti-Scratch Matte Finish + Ergonomic Grip | 1 | 68 | 1 |
| Anti-Slip & One-handed Use | 1 | 81 | 0 |
| Anti-Yellowing & Sweat-Resistant | 1 | 81 | 0 |
| Bubble Free Built-in 9H Glass Screen Protector | 1 | 58 | 1 |
| Built to Last | 1 | 62 | 1 |
| Built-in Kickstand | 1 | 52 | 1 |
| CUSTOM‑MOLDED ACCURACY | 1 | 75 | 1 |
| Camera & Screen Protection | 1 | 29 | 1 |
| Camera & Shock protection | 1 | 55 | 1 |
| Camera Control & Lightweight Build | 1 | 38 | 1 |
| Camera Control Button Integration | 1 | 22 | 1 |
| Camera Protection | 1 | 25 | 1 |
| Camera Slide Cover | 1 | 21 | 1 |
| Certified Eco-Friendly Choice | 1 | 52 | 1 |
| Clear and Not Yellowing | 1 | 15 | 1 |
| Comfort Meets Conscious Design | 1 | 73 | 1 |
| Comfortable | 1 | 52 | 1 |
| Compatibility & Packaging | 1 | 36 | 1 |
| Compatibility & Replacement Guarantee | 1 | 38 | 1 |
| Compatible Phone Model | 1 | 39 | 1 |
| Compatible With | 1 | 85 | 1 |
| Compatible with MagSafe | 1 | 76 | 1 |
| Compatible with Magnetic Accessories | 1 | 22 | 1 |
| Compatible with Magsafe Accessories | 1 | 43 | 1 |
| Compatible with iPhone 17 Pro Max | 1 | 40 | 1 |
| Compatiblility | 1 | 91 | 0 |
| Comprehensive Protection | 1 | 15 | 1 |
| Crystal Clear | 1 | 35 | 1 |
| Crystal Clear & Advanced Non-Yellowing | 1 | 5 | 1 |
| Crystal Clear & Not Yellowing | 1 | 32 | 1 |
| Curly Wave Frame Shape Design | 1 | 25 | 1 |
| Curved Wavy Edge Design | 1 | 76 | 1 |
| Cute & Trendy Polka Dot Design | 1 | 42 | 1 |
| Cute Design | 1 | 16 | 1 |
| DESIGNED BY elago | 1 | 82 | 1 |
| DIY Stickers & Kickstand Included | 1 | 99 | 1 |
| DUAL‑LAYER DURABILITY, MAGSAFE READY | 1 | 24 | 1 |
| DUAL‑LAYER IMPACT DEFENSE | 1 | 27 | 1 |
| Designed for Samsung Galaxy S26 Ultra 6.9" | 1 | 21 | 1 |
| Designed for iPhone 17 | 1 | 15 | 1 |
| Double Check Your Model | 1 | 28 | 1 |
| Drop & Camera Protection | 1 | 79 | 1 |
| Dual-layer Protective Case | 1 | 81 | 0 |
| ENGINEERED WITH PURPOSE | 1 | 46 | 1 |
| EXCEEDS MILITARY DROP STANDARDS | 1 | 75 | 1 |
| Eco-Conscious Durability | 1 | 2 | 1 |
| Elegant and Stylish | 1 | 74 | 1 |
| Enhanced Camera & Screen Protection | 1 | 92 | 1 |
| Enhanced MagSafe Compatibility | 1 | 32 | 1 |
| Enhanced Protection | 1 | 30 | 1 |
| Enhanced Shockproof Protection | 1 | 7 | 1 |
| Epic Precision | 1 | 98 | 1 |
| Excellent Anti-drop Capability | 1 | 11 | 1 |
| Excellent Grip and Non Slip | 1 | 39 | 1 |
| Excellent Grip and Non-slip | 1 | 7 | 1 |
| Excellent Military-Grade Drop Protection | 1 | 56 | 1 |
| Exclusive Detachable 3-Color Buttons | 1 | 22 | 1 |
| Fashionable Glitter Flower | 1 | 67 | 1 |
| Fashionable and Magnetic Strips Design | 1 | 85 | 1 |
| Fast Wireless Charging Compatible | 1 | 79 | 1 |
| Fit All Magnet Accessories | 1 | 58 | 1 |
| Fit Galaxy S23 Only | 1 | 28 | 1 |
| Flawless Fit, Super Slim | 1 | 35 | 1 |
| For Every Scene | 1 | 52 | 1 |
| For iPhone 15 Pro Slim Case | 1 | 7 | 1 |
| Full Camera Lens Protection | 1 | 72 | 0 |
| Full Camera Protection | 1 | 85 | 1 |
| Full Coverage Camera Protection | 1 | 64 | 0 |
| Full Glitter Design | 1 | 78 | 1 |
| Full Hinge & All-Round Military-Grade Drop Protection | 1 | 84 | 1 |
| Full Hinge Protection | 1 | 95 | 1 |
| GRIPPY LIQUID SILICONE ARMOR | 1 | 82 | 1 |
| GRIPPY NOT STICKY | 1 | 71 | 1 |
| Genuine Liquid Silicone | 1 | 74 | 1 |
| Gift | 1 | 91 | 0 |
| Good Grip & Precise Cutouts | 1 | 42 | 1 |
| Good Quality | 1 | 87 | 1 |
| Great Gift Idea | 1 | 42 | 1 |
| Great Gift for Friends | 1 | 54 | 1 |
| Great Gifts for Friends | 1 | 66 | 0 |
| HD Tempered Glass Screen Protector | 1 | 18 | 1 |
| Hands-Free on the Big Screen | 1 | 95 | 1 |
| High-Quality Materials | 1 | 98 | 1 |
| Hybrid 2-Layer Shell Protection | 1 | 30 | 1 |
| HyperMagnetic Core Technology | 1 | 68 | 1 |
| IN-HOUSE DESIGN FOR iPHONE 17 PRO | 1 | 82 | 1 |
| INTELLIGENT ENGINEERED CONTROLS | 1 | 19 | 1 |
| Installation Tips | 1 | 31 | 1 |
| Integrated Camera Lens Protection | 1 | 14 | 1 |
| Invisible Built-in Stand | 1 | 64 | 0 |
| LIFETIME SUPPORT | 1 | 88 | 1 |
| LOCK-ON POWER COMPATIBLE WITH MAGSAFE | 1 | 82 | 1 |
| Lens Protection | 1 | 91 | 0 |
| Lifetime Shield Guarantee | 1 | 68 | 1 |
| Lightweight & Pocket Friendly | 1 | 70 | 1 |
| Luxury and Stylish | 1 | 98 | 1 |
| MAGSAFE MUSCLE | 1 | 71 | 1 |
| MAXIMUM IMPACT PROTECTION | 1 | 19 | 1 |
| MINIMALIST DESIGN, MAXIMUM STYLE | 1 | 75 | 1 |
| MINIMALIST STYLE | 1 | 46 | 1 |
| Magnetic Accessory Friendly | 1 | 21 | 1 |
| Magnetic Craft | 1 | 40 | 1 |
| Magnetic Kickstand | 1 | 31 | 1 |
| Magnetic O-Ring Kickstand | 1 | 4 | 1 |
| Magnetic Pro, Snap Pro | 1 | 100 | 1 |
| Magnetic Ring Kickstand | 1 | 72 | 0 |
| Mag‑Safe 2‑in‑1 Detachable | 1 | 97 | 0 |
| Material | 1 | 16 | 1 |
| Matte Texture & Silky Feel | 1 | 11 | 1 |
| Matte Translucent Back Panel | 1 | 84 | 1 |
| Militarty Grade Drop Protection | 1 | 36 | 1 |
| Military Full Body & Unique Camera Control | 1 | 58 | 1 |
| Military Grade Drop Protection | 1 | 39 | 1 |
| Military Grade Protection and Air Cushion Technology | 1 | 83 | 1 |
| Military-Grade Drop Defense | 1 | 68 | 1 |
| Military-Grade Dual-Layer Protection | 1 | 2 | 1 |
| Modern and Slim Design | 1 | 83 | 1 |
| More Convenient | 1 | 90 | 1 |
| More Durability | 1 | 90 | 1 |
| More Protection | 1 | 90 | 1 |
| More Security | 1 | 90 | 1 |
| More Support | 1 | 90 | 1 |
| Multi-Color Options & Eco-Friendly | 1 | 74 | 1 |
| Multi‑functional Rotatable Ring Stand | 1 | 31 | 1 |
| Must‑Have Fashion | 1 | 93 | 1 |
| N52 magnet - for Magsafe accessories compatibility | 1 | 79 | 1 |
| Never Yellow Crystal Clear | 1 | 58 | 1 |
| New-tech slide camera cover | 1 | 37 | 1 |
| No Magnetic Function & Wireless Charging Notice | 1 | 99 | 1 |
| Non-Yellowing & Chic Fashion | 1 | 70 | 1 |
| Note | 1 | 61 | 1 |
| One year warranty for replacement if any quality issue. | 1 | 45 | 1 |
| Only for iPhone 17 Pro Max | 1 | 35 | 1 |
| POCKET‑FRIENDLY PROTECTION | 1 | 24 | 1 |
| PRECISION FIT FOR IPHONE 16 SERIES | 1 | 24 | 1 |
| PRECISION FIT FOR IPHONE 17e–13 | 1 | 27 | 1 |
| PRECISION‑ENGINEERED | 1 | 46 | 1 |
| PRODUCT SUPPORT | 1 | 58 | 1 |
| PROTECTION WITH GRIP | 1 | 19 | 1 |
| Package Includes | 1 | 78 | 1 |
| Package included | 1 | 61 | 1 |
| Perfect Compatibility & Professional Support | 1 | 99 | 1 |
| Perfect Compatibility & Reliable Support | 1 | 32 | 1 |
| Perfect Fit & Camera Control | 1 | 10 | 1 |
| Perfect Fit & Compatibility | 1 | 42 | 1 |
| Perfect Fit & Full Wireless Charging Support | 1 | 5 | 1 |
| Perfect Fit for iPhone 12 and 12 Pro | 1 | 57 | 1 |
| Perfect Fit for iPhone 14 and iPhone 13 | 1 | 20 | 1 |
| Perfect Gift & Compatibility | 1 | 72 | 0 |
| Perfect for Women | 1 | 34 | 1 |
| Personalized Appearance | 1 | 17 | 1 |
| Pioneer, Hand Free, Life Better | 1 | 100 | 1 |
| Plating Design | 1 | 72 | 0 |
| Powerful Magnetic | 1 | 64 | 0 |
| Powerful Magnetic Attraction | 1 | 11 | 1 |
| Powerful magnetic attachment | 1 | 37 | 1 |
| Practical Design for Secure Grip | 1 | 2 | 1 |
| Precise Compatibility & 2 Free Screen Protectors Included | 1 | 95 | 1 |
| Precise Cutout | 1 | 40 | 1 |
| Precise Fit | 1 | 34 | 1 |
| Precisely Cutouts | 1 | 36 | 1 |
| Precision cutting | 1 | 85 | 1 |
| Precision-Fit Design | 1 | 87 | 1 |
| Premium Liquid Silicone | 1 | 93 | 1 |
| Premium Material Construction | 1 | 31 | 1 |
| Premium Material and Feel | 1 | 66 | 0 |
| Premium Matte Finish | 1 | 92 | 1 |
| Process features | 1 | 54 | 1 |
| Product Features | 1 | 66 | 0 |
| Propped-up Kickstand | 1 | 73 | 1 |
| Protect the essentials | 1 | 83 | 1 |
| Protective Design | 1 | 87 | 1 |
| Quality Material & No Yellowing | 1 | 36 | 1 |
| Quality Service | 1 | 78 | 1 |
| Quick Charging Experience | 1 | 29 | 1 |
| RAISED-EDGE PROTECTION | 1 | 82 | 1 |
| RUGGED MULTI‑LAYER IMPACT SHIELD | 1 | 53 | 1 |
| RUGGED, SHOCKPROOF DEFENSE | 1 | 24 | 1 |
| Raised Bevel Camera Design | 1 | 74 | 1 |
| Raised Bezel Camera Protection | 1 | 98 | 1 |
| Raised Edge Protection | 1 | 93 | 1 |
| Raised Protective Bezel | 1 | 35 | 1 |
| Reasonable Full Body Protection | 1 | 67 | 1 |
| Reliable 24/7 Support & 365-Day Assurance | 1 | 5 | 1 |
| Resists Dirt, Stains & Yellowing | 1 | 28 | 1 |
| Rugged Military-Grade Shockproof | 1 | 22 | 1 |
| Rugged Multi-Layer Defense | 1 | 20 | 1 |
| SCREEN & CAMERA, GUARDED | 1 | 71 | 1 |
| SECURE GRIP PROTECTION | 1 | 53 | 1 |
| SLIM & POCKET‑FRIENDLY | 1 | 71 | 1 |
| SLIM & TOUGH | 1 | 69 | 1 |
| SLIM, POCKET‑FRIENDLY PROTECTION | 1 | 27 | 1 |
| SMART SHOCK‑ABSORBING ENGINEERING | 1 | 59 | 1 |
| SMART, SUSTAINABLE ENGINEERING | 1 | 75 | 1 |
| SMOOTH, POCKET‑FRIENDLY DESIGN | 1 | 9 | 1 |
| SUPER MAGNETISM | 1 | 88 | 1 |
| SUSTAINABLE MEETS SMART DESIGN | 1 | 9 | 1 |
| Screen & Camera Protection | 1 | 39 | 1 |
| SecuLink Technology | 1 | 79 | 1 |
| Secure Card Slot | 1 | 97 | 0 |
| Secure Grip & Slim Profile | 1 | 99 | 1 |
| Secure Grip, Streamlined Protection | 1 | 20 | 1 |
| Shield Securely, Fearless Living | 1 | 100 | 1 |
| Shockproof Drop Protection | 1 | 21 | 1 |
| Shoot Smoothly, Hold Comfortably | 1 | 100 | 1 |
| Side Socket | 1 | 94 | 1 |
| Skin-Friendly | 1 | 40 | 1 |
| Slim & Pocket-Friendly | 1 | 97 | 0 |
| Slim Profile & Secure Grip | 1 | 22 | 1 |
| Slim Profile, Invisible Stand | 1 | 95 | 1 |
| Slim and Lightweight | 1 | 78 | 1 |
| Slim and Precise Cutouts | 1 | 67 | 1 |
| Slim and stylish design | 1 | 37 | 1 |
| Slim, Lightweight Design | 1 | 10 | 1 |
| Slim, Pleasantly Velvety Grip | 1 | 43 | 1 |
| Snap On, Charge On | 1 | 95 | 1 |
| Spigen Designed for iPhone 16e Case (2025) / iPhone 17e Case (2026) | 1 | 83 | 1 |
| Spigen Patented Hinge Protection | 1 | 79 | 1 |
| Stand Steady, Feel Stable | 1 | 100 | 1 |
| Stand Up, Power Up | 1 | 95 | 1 |
| Strong Magnetic Adsorption | 1 | 34 | 1 |
| Strong Magnetic Attachment | 1 | 97 | 0 |
| Strong Magnetism | 1 | 4 | 1 |
| Strong Magnetism Technology | 1 | 72 | 0 |
| Strong N52 Magnet | 1 | 28 | 1 |
| Strong Protection | 1 | 16 | 1 |
| Strong Protection & Shock-Absorbent | 1 | 43 | 1 |
| Stronger Magnetic | 1 | 36 | 1 |
| Stylish & Elegant | 1 | 23 | 1 |
| Stylish Personalization | 1 | 30 | 1 |
| Stylish Translucent Matte Design | 1 | 76 | 1 |
| Super Magnetic Adsorption | 1 | 92 | 1 |
| Super Strong Magnetic | 1 | 38 | 1 |
| TORRAS Care, Stress-Free After-Sales Support | 1 | 100 | 1 |
| TOUGH, MILITARY‑TESTED PROTECTION | 1 | 9 | 1 |
| Tortoiseshell Leopard Print | 1 | 91 | 0 |
| Translucent Design | 1 | 4 | 1 |
| Translucent Matte & Cute Wave Frame Curly Design | 1 | 56 | 1 |
| Translucent Matte Back & Fashionable Shape | 1 | 39 | 1 |
| Translucent Matte Design | 1 | 29 | 1 |
| Trusted Protection & Slim Profile | 1 | 5 | 1 |
| ULTIMATE DROP PROTECTION | 1 | 71 | 1 |
| ULTRA‑SLEEK, SUSTAINABLE STYLE | 1 | 59 | 1 |
| ULTRA‑SLIM MILITARY‑GRADE PROTECTION | 1 | 46 | 1 |
| Ultimate Protection and Precise Cutout | 1 | 83 | 1 |
| Ultra Strong Magnetic & Perfect Alignment | 1 | 81 | 0 |
| Ultra-Slim & Lightweight | 1 | 28 | 1 |
| Upgraded Camera Protection | 1 | 7 | 1 |
| Upgraded Lens Coverage & Mil-Grade Drop Protection | 1 | 99 | 1 |
| Upgraded Materials | 1 | 92 | 1 |
| User-Friendly Design | 1 | 30 | 1 |
| VISIBLE PROTECTION | 1 | 88 | 1 |
| Warranty | 1 | 85 | 1 |
| Wave Design & Translucent Matte | 1 | 38 | 1 |
| Weather and Chemical Resistance | 1 | 31 | 1 |
| What's in the Box | 1 | 35 | 1 |
| Widely Compatible | 1 | 70 | 1 |
| Wireless Charging Compatible | 1 | 20 | 1 |
| Worry-Free Purchase Ultimate Protection | 1 | 32 | 1 |
| “Anti-slip design” | 1 | 96 | 1 |
| “Increase protection” | 1 | 96 | 1 |
| “Multi-layer protection” | 1 | 96 | 1 |
| “Screen Protector” | 1 | 96 | 1 |

<a id="brand-statistics"></a>
## 品牌模板与长度

| 品牌 | 记录数 | 标题字符中位数 | 段落词数中位数 | 来源名次 |
| --- | --- | --- | --- | --- |
| OtterBox | 11 | 56 | 28 | 9, 19, 20, 24, 27, 46, 53, 57, 59, 69, 75 |
| TORRAS | 7 | 74 | 53.0 | 5, 22, 48, 65, 88, 95, 100 |
| 未确定 | 7 | 61 | 39 | 13, 64, 66, 72, 81, 91, 97 |
| FNTCASE | 6 | 75.0 | 40.0 | 2, 12, 14, 52, 73, 84 |
| Spigen | 5 | 97 | 13 | 6, 50, 79, 80, 83 |
| SUPFINE | 3 | 53 | 23 | 1, 18, 55 |
| ESR | 3 | 61 | 34 | 3, 10, 62 |
| Janmitta | 3 | 70 | 35 | 26, 44, 63 |
| JETech | 3 | 48 | 24 | 33, 60, 92 |
| Apple | 2 | 150.5 | 22.0 | 8, 89 |
| YENAPOON | 2 | 69.5 | 48.0 | 17, 23 |
| Amzfield | 2 | 64.0 | 38.0 | 25, 30 |
| LeYi | 2 | 74.0 | 40.5 | 28, 31 |
| GVIEWIN | 2 | 74.5 | 44.0 | 38, 70 |
| RMOCR | 2 | 73.5 | 34.5 | 41, 86 |
| Thomo | 2 | 117.5 | 34.5 | 43, 68 |
| Yzoiko | 2 | 71.0 | 59.0 | 47, 51 |
| Newfuture | 2 | 68.0 | 58.0 | 49, 77 |
| ORNARTO | 2 | 65.5 | 36.5 | 74, 93 |
| SKYLMW | 1 | 69 | 31 | 4 |
| LOVE 3000 | 1 | 168 | 49.5 | 7 |
| CANSHN | 1 | 63 | 31 | 11 |
| CACOE | 1 | 49 | 19 | 15 |
| Yeddabox | 1 | 114 | 23 | 16 |
| JAME | 1 | 75 | 34 | 21 |
| ImpactStrong | 1 | 187 | 45.5 | 29 |
| toushion | 1 | 48 | 48 | 32 |
| zapica | 1 | 51 | 37 | 34 |
| Mkeke | 1 | 54 | 34 | 35 |
| Misea | 1 | 66 | 47 | 36 |
| SURITCH | 1 | 179 | 36 | 37 |
| DEERLAMN | 1 | 188 | 45.0 | 39 |
| jaroco | 1 | 70 | 30 | 40 |
| Hython | 1 | 190 | 41 | 42 |
| OTOFLY | 1 | 159 | 44 | 45 |
| inewateri | 1 | 72 | 23 | 54 |
| CAPRARO | 1 | 65 | 41 | 56 |
| Miracase | 1 | 193 | 45 | 58 |
| TENOC | 1 | 119 | 13 | 61 |
| EYZUTAK | 1 | 71 | 41 | 67 |
| Smartish | 1 | 73 | 37 | 71 |
| Pepmune | 1 | 66 | 39 | 76 |
| Choiche | 1 | 68 | 39 | 78 |
| elago | 1 | 60 | 34 | 82 |
| Misscase | 1 | 193 | 37 | 85 |
| ZTOFERA | 1 | 59 | 33 | 87 |
| AOTESIER | 1 | 187 | 55 | 90 |
| CASETiFY | 1 | 149 | 6 | 94 |
| Diverbox | 1 | 164 | 44 | 96 |
| Teageo | 1 | 75 | 39 | 98 |
| ASEKOO | 1 | 74 | 44.0 | 99 |

<a id="deduplicated"></a>
## 去重敏感性对照

删除重复文案中的较后名次只用于该计算视图；原文文件没有删除或改写。去重口径 97 组文案、513 段，不等于独立 ASIN。

| 词项 | 原始 TF | 去重 TF | 原始记录覆盖 /100 | 去重文案覆盖 /97 |
| --- | --- | --- | --- | --- |
| protection | 233 | 229 | 94 | 92 |
| camera | 190 | 182 | 80 | 77 |
| magnetic | 140 | 132 | 54 | 51 |
| screen | 129 | 125 | 67 | 64 |
| charging | 106 | 102 | 77 | 74 |
| built | 86 | 86 | 51 | 51 |
| drop | 90 | 86 | 67 | 64 |
| back | 88 | 83 | 55 | 52 |
| wireless | 83 | 81 | 67 | 65 |
| raised | 83 | 79 | 62 | 59 |
| grip | 75 | 72 | 57 | 55 |
| magsafe | 76 | 71 | 51 | 49 |
| tpu | 74 | 70 | 54 | 52 |
| easy | 69 | 69 | 42 | 42 |
| military | 69 | 67 | 52 | 50 |
| scratches | 68 | 65 | 59 | 56 |
| slim | 64 | 62 | 50 | 48 |
| matte | 59 | 57 | 31 | 29 |
| grade | 59 | 56 | 45 | 43 |
| lens | 53 | 53 | 33 | 33 |

<a id="first-point-coding"></a>
## 首条主任务编码来源

人工按主任务单分类；品牌设计同时说明适配的单列。

| 主任务 | 数量 | 名次 |
| --- | --- | --- |
| 机型适配及购买确认 | 62 | 2, 3, 5, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 20, 23, 24, 26, 27, 28, 30, 31, 34, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 49, 52, 53, 54, 56, 57, 59, 61, 62, 63, 66, 67, 68, 69, 70, 73, 75, 77, 81, 85, 86, 87, 91, 92, 93, 94, 96, 98 |
| 磁吸充电及不支持提示 | 15 | 1, 18, 22, 25, 29, 33, 47, 48, 51, 55, 60, 64, 65, 79, 99 |
| 支架与观看 | 6 | 4, 21, 72, 84, 95, 100 |
| 防护 | 4 | 71, 80, 83, 88 |
| 品牌设计并说明适配 | 3 | 8, 82, 89 |
| 材料与结构 | 3 | 50, 74, 90 |
| 屏幕镜头与操作 | 2 | 6, 58 |
| 包装套装 | 2 | 32, 78 |
| 透明度与外观 | 2 | 35, 76 |
| 钱包可拆结构 | 1 | 97 |

<a id="quality-notes"></a>
## 提取与编码校核

- 第 7 名标题在标题标签后的独立段落，已完整接回。
- 第 49、77 名第一条是只有标签的适配提醒，仍分别计为一个原始段落。
- 第 87 名四条无空格连字符标签经人工识别；第 96 名第一条正文中的包装冒号不计作段首标签。
- 完整标题或适配说明式的 bullet 保留原状，未悄悄删除。
- 词法信号不等于完整语义判断，例如 stand out 不是支架功能；不使用自动主题命中推定产品支持状态。
- 标题大于 75 字符的名次：6, 7, 8, 16, 18, 20, 26, 27, 29, 37, 39, 42, 45, 50, 58, 61, 64, 68, 69, 80, 85, 88, 89, 90, 94, 96, 100。
