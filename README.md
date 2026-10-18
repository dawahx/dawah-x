# DAWAH X — হালনাগাদ ওয়েবসাইট

## পেজ
- `index.html` — হোম
- `about.html` — আমাদের সম্পর্কে
- `services.html` — সেবা সমূহ
- `questions.html` — প্রশ্নোত্তর ও জবাবধর্মী লেখা
- `fatwa.html` — ফতোয়া / মাসআলা
- `videos.html` — YouTube ভিডিও গ্যালারি
- `ask.html` — প্রশ্ন পাঠান
- `contact.html` — যোগাযোগ

সব ফাইল একই ফোল্ডারে রাখুন এবং `index.html`-কে হোস্টিংয়ের ডকুমেন্ট রুটে দিন। লাইব্রেরির জন্য `questions-catalog-part-*.js` ও `fatwa-catalog-part-*.js` chunk ফাইলগুলো একই ফোল্ডারে রাখুন; বিভাগ বাছাই বা সার্চের সময় প্রয়োজনীয় অংশই লোড হয়।

## লাইব্রেরি সূচি
- আত-তাহরীক: ৮,০১২টি অনন্য ফতোয়া/প্রশ্নোত্তর লিংক + ৩,৬০৪টি সাধারণ প্রবন্ধ (আলাদা লেবেলযুক্ত)।
- আল-ইতিছাম: ৪,৭৮৪টি অনন্য প্রশ্নোত্তর লিংক (মূল ৪,৬৪১ + নতুন ১৪৩) + ২,২৫৩টি সাধারণ প্রবন্ধ (মূল ৩৯৬ + নতুন ১,৮৫৭; আলাদা লেবেলযুক্ত)।
- From Muslims: ২৩২টি প্রশ্নোত্তর + ৩৫৮টি প্রবন্ধ।
- Response to Anti-Islam: ৩২৭টি নিবন্ধ।

প্রশ্নোত্তর/জবাবধর্মী সূচি: ৯১৯টি রেফারেন্স। মোট ফতোয়া/প্রশ্নোত্তর: ১২,৭৯৬টি; অতিরিক্ত সাধারণ প্রবন্ধ: ৫,৮৫৭টি (ফতোয়া হিসেবে গণ্য নয়); মোট searchable metadata ১৮,৬৫৩টি। নতুন আল-ইতিছাম সংযোজনের মধ্যে ১৪৩টি যাচাইকৃত প্রশ্নোত্তর এবং ১,৮৫৭টি প্রবন্ধ। পুরনো নির্বাচিত তালিকাও সার্চে থাকে। এখানে শিরোনাম, বিভাগ/উৎস ও মূল লিংক সূচিবদ্ধ; পূর্ণ উত্তর/প্রবন্ধ মূল প্রকাশকের সাইটে খোলে। ফতোয়া/প্রশ্নোত্তর আর্কাইভ ও নতুন সংযোজন সংগৃহীত ১৭ অক্টোবর ২০২৬।

## Messenger প্রশ্ন পাঠানো
প্রশ্ন পাঠালে `https://m.me/61595349861689` chat link খোলে এবং প্রশ্ন clipboard-এ কপি হয়; Messenger-এ Paste করে Send চাপতে হবে। ব্রাউজার থেকে Messenger-এ স্বয়ংক্রিয়ভাবে বার্তা পাঠানো যায় না। পুরো স্বয়ংক্রিয় delivery চাইলে Meta Messenger API, access token ও secure backend configure করতে হবে।


## Static YouTube video catalogue
`videos.html` includes a combined, fixed catalogue of 5,000 public channel-list entries: 1 DAWAH X video, 2,798 from Professor Dr. Abubakar Muhammad Zakaria, 201 from Salafi Manhaj 2, and 2,000 from Peace TV Bangla (@PeaceTVprogram). It displays 20 per page, supports title/channel search and page navigation, and opens selected videos in an on-page YouTube player. No API key is required; new uploads are not added automatically. Individual videos may be restricted by YouTube or by their channel owner. See `YOUTUBE-SETUP.md`.


## Live date and time
A live Bangladesh date/time display is shown on every page using the `Asia/Dhaka` timezone. The date is in English and the clock uses English numerals in 12-hour format with AM/PM, updating every second.

## Dhaka clock
The homepage shows the current Dhaka date and time in `Asia/Dhaka`, updating every second. It works entirely in the browser and does not need a server-side API.

## GitHub Pages deployment
Extract the ZIP and upload the files and folders inside it to the repository root (not the ZIP itself). Enable GitHub Pages for the branch and root folder. The site uses standalone `.html` routes and static assets, so GitHub Pages can serve it without a serverless function.

## YouTube video player
The YouTube player uses an iframe and may be blocked by strict network or browser privacy settings. Every menu item opens its own HTML page. GitHub Pages serves the extracted files as a static website.
