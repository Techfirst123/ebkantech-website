// Common questions about the EPC ERP platform, answered instantly without
// calling any AI provider. Add more entries here any time — each new entry
// saves future API calls.
//
// Chainable topics also carry `question` (chip label) and `related` (4 topic
// ids) so the UI can keep suggesting fresh, on-topic follow-up questions
// after every turn — see services/relatedQuestions.js.
const faqData = [
  {
    id: "greeting",
    aliases: {
      english: ["hi", "hello", "hey", "hey there", "good morning", "good evening"],
      hindi: ["नमस्ते", "हाय", "हेलो", "गुड मॉर्निंग"],
      hinglish: ["hi", "hello", "hey", "namaste", "kaise ho aap", "good morning"],
    },
    answer: {
      english:
        "Hello! I'm your EPC ERP Assistant. How can I help you understand our platform today?",
      hindi:
        "नमस्ते! मैं आपका EPC ERP Assistant हूँ। बताइए, हमारे platform के बारे में मैं आपकी कैसे मदद कर सकता हूँ?",
      hinglish:
        "Hello! Main aapka EPC ERP Assistant hoon. Bataiye, hamare platform ke baare mein aapki kaise help kar sakta hoon?",
    },
  },
  {
    id: "how_are_you",
    aliases: {
      english: [
        "how are you",
        "how are you doing",
        "what's up",
        "how is it going",
        "how do you do",
      ],
      hindi: [
        "कैसे हो",
        "आप कैसे हैं",
        "क्या हाल है",
        "क्या हाल चाल है",
        "तुम कैसे हो",
      ],
      hinglish: [
        "kaise ho",
        "aap kaise hain",
        "kya haal hai",
        "kya haal chaal hai",
        "tum kaise ho",
        "sab badhiya",
      ],
    },
    answer: {
      english:
        "I'm doing great, thanks for asking! I'm your EPC ERP Assistant — how can I help you understand our platform today?",
      hindi:
        "मैं बिल्कुल ठीक हूँ, पूछने के लिए शुक्रिया! मैं आपका EPC ERP Assistant हूँ — बताइए, हमारे platform से जुड़ी किस चीज़ में आपकी मदद कर सकता हूँ?",
      hinglish:
        "Main bilkul theek hoon, pochne ke liye shukriya! Main aapka EPC ERP Assistant hoon — bataiye, hamare platform ke related kis cheez mein aapki help kar sakta hoon?",
    },
  },
  {
    id: "platform_overview",
    question: "What does this ERP do?",
    related: ["field_data_capture", "milestone_mapping", "ai_assistant_features", "key_benefits"],
    aliases: {
      english: [
        "what is this erp",
        "what does this platform do",
        "tell me about this erp",
        "what problem does this erp solve",
        "what is ebkan tech's erp",
      ],
      hindi: ["यह ERP क्या है", "यह प्लेटफॉर्म क्या करता है", "यह सिस्टम किस लिए है"],
      hinglish: [
        "yeh erp kya hai",
        "yeh platform kya karta hai",
        "ye system kis liye hai",
      ],
    },
    answer: {
      english:
        "Our EPC ERP is a single platform built specifically for EPC companies — it brings together field progress tracking, vendor/contractor payments, quality inspection sign-offs, and an AI Assistant for reporting, all in one place. Instead of chasing updates on WhatsApp, Excel, and phone calls, your whole project — from site data to vendor payments to management dashboards — flows through one connected system.",
      hindi:
        "हमारा EPC ERP खास तौर पर EPC कंपनियों के लिए बनाया गया एक ही platform है — इसमें फील्ड प्रोग्रेस ट्रैकिंग, वेंडर/कॉन्ट्रैक्टर पेमेंट्स, क्वालिटी इंस्पेक्शन साइन-ऑफ और रिपोर्टिंग के लिए एक AI Assistant, सब कुछ एक जगह मिलता है। WhatsApp, Excel और फोन कॉल्स पर अपडेट ढूंढने की बजाय, आपका पूरा प्रोजेक्ट — साइट डेटा से लेकर वेंडर पेमेंट्स और मैनेजमेंट डैशबोर्ड तक — एक ही connected सिस्टम से गुज़रता है।",
      hinglish:
        "Hamara EPC ERP khaas taur pe EPC companies ke liye bana ek hi platform hai — isme field progress tracking, vendor/contractor payments, quality inspection sign-off aur reporting ke liye ek AI Assistant, sab kuch ek jagah milta hai. WhatsApp, Excel aur phone calls pe updates dhoondhne ki jagah, aapka poora project — site data se lekar vendor payments aur management dashboard tak — ek hi connected system se guzarta hai.",
    },
  },
  {
    id: "field_data_capture",
    question: "How is field data captured?",
    related: ["milestone_mapping", "field_to_progress_report", "inspection_signoff", "warehouse"],
    aliases: {
      english: [
        "how is field data captured",
        "how do site engineers update progress",
        "how does data get into the erp",
        "field data capture process",
      ],
      hindi: [
        "फील्ड डेटा कैसे कैप्चर होता है",
        "साइट इंजीनियर प्रोग्रेस कैसे अपडेट करते हैं",
      ],
      hinglish: [
        "field data kaise capture hota hai",
        "site engineer progress kaise update karte hain",
        "field data erp mein kaise aata hai",
      ],
    },
    answer: {
      english:
        "Site engineers log everything directly from the field:\n1) Stage-wise work updates\n2) Site inspection checklists\n3) Photos and readings\n4) Sign-offs at each stage\n\nThis data flows straight into the ERP in real time, so there's no waiting for someone to type it up later or send it over WhatsApp.",
      hindi:
        "साइट इंजीनियर सीधे फील्ड से यह सब लॉग करते हैं:\n1) स्टेज-वाइज़ वर्क अपडेट्स\n2) साइट इंस्पेक्शन चेकलिस्ट\n3) फोटोज़ और रीडिंग्स\n4) हर स्टेज पर साइन-ऑफ\n\nयह डेटा रियल टाइम में सीधे ERP में चला जाता है, इसलिए बाद में किसी को टाइप करने या WhatsApp पर भेजने का इंतज़ार नहीं करना पड़ता।",
      hinglish:
        "Site engineers directly field se yeh sab log karte hain:\n1) Stage-wise work updates\n2) Site inspection checklists\n3) Photos aur readings\n4) Har stage pe sign-off\n\nYeh data real time mein directly ERP mein chala jaata hai, isliye baad mein kisi ko type karne ya WhatsApp pe bhejne ka wait nahi karna padta.",
    },
  },
  {
    id: "milestone_mapping",
    question: "What are the project milestones?",
    related: ["vendor_payment", "field_data_capture", "dashboard", "reports_types"],
    aliases: {
      english: [
        "what are milestones",
        "what are the project milestones",
        "how is project scope divided",
        "milestone mapping",
        "what stages does the erp track",
      ],
      hindi: [
        "माइलस्टोन क्या होते हैं",
        "प्रोजेक्ट स्कोप कैसे बांटा जाता है",
      ],
      hinglish: [
        "milestone kya hote hain",
        "project scope kaise divide hota hai",
        "erp kaunse stages track karta hai",
      ],
    },
    answer: {
      english:
        "Every project's work scope is broken down into clear milestones by the ERP's scope engine, such as:\n1) PV\n2) Structure\n3) DC\n4) Inverter\n5) AC\n6) Transformer\n7) HT\n8) Earthing\n9) SCADA\n10) Testing\n11) Handover\n\nEach milestone tracks its own progress, so you always know exactly which stage every part of the project is in.",
      hindi:
        "हर प्रोजेक्ट के वर्क स्कोप को ERP का scope engine साफ-साफ माइलस्टोन में बांट देता है, जैसे:\n1) PV\n2) Structure\n3) DC\n4) Inverter\n5) AC\n6) Transformer\n7) HT\n8) Earthing\n9) SCADA\n10) Testing\n11) Handover\n\nहर माइलस्टोन की अपनी प्रोग्रेस ट्रैक होती है, इसलिए आपको हमेशा पता रहता है कि प्रोजेक्ट का कौन सा हिस्सा किस स्टेज में है।",
      hinglish:
        "Har project ke work scope ko ERP ka scope engine clearly milestones mein baant deta hai, jaise:\n1) PV\n2) Structure\n3) DC\n4) Inverter\n5) AC\n6) Transformer\n7) HT\n8) Earthing\n9) SCADA\n10) Testing\n11) Handover\n\nHar milestone ki apni progress track hoti hai, isliye aapko hamesha pata rehta hai ki project ka kaun sa hissa kis stage mein hai.",
    },
  },
  {
    id: "vendor_payment",
    question: "How are vendor payments linked to milestones?",
    related: ["inspection_signoff", "milestone_mapping", "onboarding", "key_benefits"],
    aliases: {
      english: [
        "how are vendor payments handled",
        "how do contractor payments work",
        "vendor payment mapping",
        "how does the erp handle contractor data",
        "how do you map work progress with payment milestones",
        "how is work progress linked to payments",
      ],
      hindi: [
        "वेंडर पेमेंट कैसे होते हैं",
        "कॉन्ट्रैक्टर पेमेंट कैसे काम करता है",
      ],
      hinglish: [
        "vendor payment kaise hote hain",
        "contractor payment kaise kaam karta hai",
        "erp contractor data kaise handle karta hai",
      ],
    },
    answer: {
      english:
        "The ERP's contracts module links every payment directly to verified work:\n1) A milestone is marked complete\n2) It's verified against the inspection sign-off\n3) Only then is the payment trigger released to that vendor\n\nThis means payments are always tied to actual, signed-off progress — no manual chasing of contractors, and no paying for work that hasn't been verified.",
      hindi:
        "ERP का contracts module हर पेमेंट को verified काम से सीधे लिंक करता है:\n1) एक माइलस्टोन complete मार्क होता है\n2) उसे inspection sign-off के खिलाफ verify किया जाता है\n3) तभी उस वेंडर के लिए payment trigger रिलीज़ होता है\n\nइसका मतलब है पेमेंट हमेशा actual, sign-off हुई प्रोग्रेस से जुड़े होते हैं — कॉन्ट्रैक्टर के पीछे मैन्युअली भागना नहीं पड़ता, और बिना verify हुए काम का पेमेंट नहीं जाता।",
      hinglish:
        "ERP ka contracts module har payment ko verified kaam se directly link karta hai:\n1) Ek milestone complete mark hota hai\n2) Use inspection sign-off ke against verify kiya jaata hai\n3) Tabhi us vendor ke liye payment trigger release hota hai\n\nIska matlab payments hamesha actual, sign-off hui progress se linked hote hain — contractor ke peeche manually bhagna nahi padta, aur bina verify hue kaam ka payment nahi jaata.",
    },
  },
  {
    id: "inspection_signoff",
    question: "How does the inspection sign-off work?",
    related: ["vendor_payment", "field_data_capture", "reports_types", "ai_assistant_features"],
    aliases: {
      english: [
        "how does approval work",
        "who approves field data",
        "what is the inspection sign-off",
        "how does quality check work before payment",
      ],
      hindi: [
        "एडमिन डेटा कैसे अप्रूव करता है",
        "इंस्पेक्शन साइन-ऑफ क्या है",
      ],
      hinglish: [
        "admin data kaise approve karta hai",
        "inspection sign-off kya hai",
        "payment se pehle quality check kaise hota hai",
      ],
    },
    answer: {
      english:
        "Before any payment goes out, the work goes through a stage-wise quality sign-off: once a milestone is reported complete, it's checked and signed off for quality against the inspection checklist. Only signed-off, verified work triggers the vendor payment — so approval and payment release are directly tied together, not separate manual steps.",
      hindi:
        "किसी भी पेमेंट के जाने से पहले, काम एक stage-wise quality sign-off से गुज़रता है: जैसे ही कोई माइलस्टोन complete रिपोर्ट होता है, उसे inspection checklist के हिसाब से quality-check करके sign-off दिया जाता है। सिर्फ sign-off और verified हो चुका काम ही वेंडर पेमेंट को trigger करता है — यानी अप्रूवल और पेमेंट रिलीज़ सीधे आपस में जुड़े होते हैं, अलग-अलग मैन्युअल स्टेप्स नहीं।",
      hinglish:
        "Kisi bhi payment ke jaane se pehle, kaam ek stage-wise quality sign-off se guzarta hai: jaise hi koi milestone complete report hota hai, use inspection checklist ke hisaab se quality-check karke sign-off diya jaata hai. Sirf sign-off aur verified ho chuka kaam hi vendor payment ko trigger karta hai — matlab approval aur payment release directly ek doosre se judhe hote hain, alag-alag manual steps nahi.",
    },
  },
  {
    id: "ai_assistant_features",
    question: "What does the AI Assistant do?",
    related: ["reports_types", "field_to_progress_report", "dashboard", "key_benefits"],
    aliases: {
      english: [
        "what does the ai assistant do",
        "how does the ai layer help",
        "ai features of the erp",
        "does the erp have ai",
      ],
      hindi: [
        "AI असिस्टेंट क्या करता है",
        "इस ERP में AI कैसे मदद करता है",
      ],
      hinglish: [
        "ai assistant kya karta hai",
        "is erp mein ai kaise help karta hai",
        "kya isme ai feature hai",
      ],
    },
    answer: {
      english:
        "The ERP includes a domain-trained AI layer that works on top of your project data:\n1) Tracks progress against the plan\n2) Flags risks and delays before they escalate\n3) Generates quotations and reports automatically\n\nThese AI-generated risk flags and progress reports continuously loop back into project and vendor management, so issues get caught early instead of at month-end review.",
      hindi:
        "ERP में आपके प्रोजेक्ट डेटा पर काम करने वाला एक domain-trained AI लेयर शामिल है:\n1) प्लान के मुकाबले प्रोग्रेस ट्रैक करता है\n2) रिस्क और डिले को बढ़ने से पहले ही फ्लैग करता है\n3) कोटेशन और रिपोर्ट अपने आप जनरेट करता है\n\nये AI-generated रिस्क फ्लैग्स और प्रोग्रेस रिपोर्ट्स लगातार project और vendor management में वापस loop होते रहते हैं, इसलिए issues महीने के अंत में नहीं, बल्कि जल्दी पकड़ में आ जाते हैं।",
      hinglish:
        "ERP mein aapke project data pe kaam karne wala ek domain-trained AI layer shamil hai:\n1) Plan ke muqable progress track karta hai\n2) Risk aur delay ko badhne se pehle hi flag karta hai\n3) Quotation aur report apne aap generate karta hai\n\nYe AI-generated risk flags aur progress reports continuously project aur vendor management mein wapas loop hote rehte hain, isliye issues month-end review pe nahi, balki jaldi pakad mein aa jaate hain.",
    },
  },
  {
    id: "dashboard",
    question: "What can I see on the dashboard?",
    related: ["reports_types", "milestone_mapping", "ai_assistant_features", "key_benefits"],
    aliases: {
      english: [
        "what can i see on the dashboard",
        "what does the management dashboard show",
        "unified dashboard features",
      ],
      hindi: [
        "डैशबोर्ड पर क्या दिखता है",
        "मैनेजमेंट डैशबोर्ड में क्या है",
      ],
      hinglish: [
        "dashboard pe kya dikhta hai",
        "management dashboard mein kya hota hai",
      ],
    },
    answer: {
      english:
        "The unified dashboard gives management a single view of everything:\n1) Progress by project, by vendor, and by area\n2) Profit-loss visibility\n3) Real-time execution status\n\nSo instead of pulling separate reports from different teams, you get progress, cost, and profit/loss for every project, vendor, and region in one place.",
      hindi:
        "Unified डैशबोर्ड मैनेजमेंट को सब कुछ एक ही जगह दिखाता है:\n1) प्रोजेक्ट, वेंडर और एरिया के हिसाब से प्रोग्रेस\n2) प्रॉफिट-लॉस विज़िबिलिटी\n3) रियल-टाइम एक्ज़ीक्यूशन स्टेटस\n\nयानी अलग-अलग टीमों से अलग रिपोर्ट मंगवाने की बजाय, आपको हर प्रोजेक्ट, वेंडर और रीजन के लिए प्रोग्रेस, कॉस्ट और प्रॉफिट/लॉस एक ही जगह मिल जाता है।",
      hinglish:
        "Unified dashboard management ko sab kuch ek hi jagah dikhata hai:\n1) Project, vendor aur area ke hisaab se progress\n2) Profit-loss visibility\n3) Real-time execution status\n\nMatlab alag-alag teams se alag report mangwane ki jagah, aapko har project, vendor aur region ke liye progress, cost aur profit/loss ek hi jagah mil jaata hai.",
    },
  },
  {
    id: "key_benefits",
    question: "Why use this ERP instead of spreadsheets?",
    related: ["who_its_for", "platform_overview", "get_started", "dashboard"],
    aliases: {
      english: [
        "why should we use this erp",
        "why use this erp instead of spreadsheets",
        "what problems does this solve",
        "benefits of this erp",
        "why not just use excel",
      ],
      hindi: [
        "ये ERP क्यों इस्तेमाल करें",
        "इससे क्या फायदा है",
      ],
      hinglish: [
        "ye erp kyu use kare",
        "isse kya fayda hai",
        "excel ki jagah ye kyu",
      ],
    },
    answer: {
      english:
        "A few things teams consistently struggle with on EPC projects, that this ERP fixes directly:\n1) Milestone-linked vendor payments — no manual chasing\n2) Stage-wise quality sign-off before any payment release\n3) AI-flagged delays and risks before they escalate\n4) One single dashboard for progress, cost, and profit/loss by project, vendor, and region\n\nIt replaces scattered spreadsheets, WhatsApp updates, and manual approvals with one connected system.",
      hindi:
        "EPC प्रोजेक्ट्स में टीमें अक्सर जिन चीज़ों से जूझती हैं, यह ERP सीधे उन्हें ठीक करता है:\n1) Milestone से जुड़े वेंडर पेमेंट्स — मैन्युअली पीछे भागना नहीं\n2) किसी भी पेमेंट रिलीज़ से पहले stage-wise क्वालिटी साइन-ऑफ\n3) रिस्क और डिले बढ़ने से पहले ही AI से फ्लैग होना\n4) प्रोजेक्ट, वेंडर और रीजन के हिसाब से प्रोग्रेस, कॉस्ट और प्रॉफिट/लॉस के लिए एक ही डैशबोर्ड\n\nयह बिखरी हुई spreadsheets, WhatsApp अपडेट्स और मैन्युअल अप्रूवल की जगह एक connected सिस्टम देता है।",
      hinglish:
        "EPC projects mein teams aksar jin cheezon se jhoojhti hain, ye ERP directly unhe theek karta hai:\n1) Milestone se linked vendor payments — manually peeche bhagna nahi\n2) Kisi bhi payment release se pehle stage-wise quality sign-off\n3) Risk aur delay badhne se pehle hi AI se flag hona\n4) Project, vendor aur region ke hisaab se progress, cost aur profit/loss ke liye ek hi dashboard\n\nYe bikri hui spreadsheets, WhatsApp updates aur manual approvals ki jagah ek connected system deta hai.",
    },
  },
  {
    id: "who_its_for",
    question: "Which companies is this ERP for?",
    related: ["key_benefits", "platform_overview", "get_started", "onboarding"],
    aliases: {
      english: [
        "who is this erp for",
        "which companies use this",
        "is this only for solar",
        "which industries does this support",
      ],
      hindi: [
        "ये ERP किसके लिए है",
        "कौन सी कंपनियां इसे इस्तेमाल करती हैं",
      ],
      hinglish: [
        "ye erp kiske liye hai",
        "konsi companies isko use karti hain",
        "kya ye sirf solar ke liye hai",
      ],
    },
    answer: {
      english:
        "This ERP is built for EPC (Engineering, Procurement, Construction) companies that manage field execution through vendors and contractors — solar EPC is a core use case, and the same milestone-based structure works for other EPC-style project execution too.",
      hindi:
        "यह ERP उन EPC (Engineering, Procurement, Construction) कंपनियों के लिए बना है जो वेंडर और कॉन्ट्रैक्टर्स के ज़रिए फील्ड एक्ज़ीक्यूशन मैनेज करती हैं — Solar EPC इसका मुख्य use case है, और यही milestone-based structure दूसरी EPC-style प्रोजेक्ट एक्ज़ीक्यूशन के लिए भी काम करता है।",
      hinglish:
        "Ye ERP un EPC (Engineering, Procurement, Construction) companies ke liye bana hai jo vendor aur contractors ke through field execution manage karti hain — Solar EPC iska core use case hai, aur yehi milestone-based structure doosri EPC-style project execution ke liye bhi kaam karta hai.",
    },
  },
  {
    id: "field_to_progress_report",
    question: "How do you map field data with the progress report?",
    related: ["field_data_capture", "milestone_mapping", "reports_types", "ai_assistant_features"],
    aliases: {
      english: [
        "how do you map field data with the progress report",
        "how does field data become a progress report",
        "how is field data mapped to progress reports",
      ],
    },
    answer: {
      english:
        "Field data flows straight into progress reporting:\n1) Site engineers submit stage-wise updates, checklists, photos and readings\n2) That data is mapped against the project's milestones (PV, Structure, DC, Inverter, AC, etc.)\n3) The AI layer compares this against the plan and rolls it up into progress reports\n\nSo the progress report you see isn't a manual summary — it's built directly from verified field submissions.",
    },
  },
  {
    id: "reports_types",
    question: "What kind of reports do you provide?",
    related: ["dashboard", "ai_assistant_features", "field_to_progress_report", "vendor_payment"],
    aliases: {
      english: [
        "what kind of reports do you provide",
        "what reports does the erp generate",
        "what reporting does the platform offer",
      ],
    },
    answer: {
      english:
        "The platform generates a few different types of reports automatically:\n1) Progress reports — plan vs. actual, by project/vendor/area\n2) Risk & delay flag reports from the AI layer\n3) Quotation generation\n4) Profit-loss and financial reports by project, vendor, and region\n\nAll of these pull directly from the verified field and milestone data, so they stay up to date without manual report-building.",
    },
  },
  {
    id: "warehouse",
    question: "How do you manage warehouse?",
    related: ["field_data_capture", "milestone_mapping", "onboarding", "reports_types"],
    aliases: {
      english: [
        "how do you manage warehouse",
        "how does warehouse management work",
        "do you handle inventory",
        "how is material tracked",
      ],
    },
    answer: {
      english:
        "Material and equipment for each project are planned and tracked as part of the milestone scope (e.g. PV, Structure, DC, Inverter, Transformer, etc.). For the specifics of warehouse/inventory management in your workflow, it's best if our team walks you through it on a quick call — want me to arrange that?",
    },
  },
  {
    id: "onboarding",
    question: "How do you onboard vendors/clients on the ERP?",
    related: ["vendor_payment", "get_started", "warehouse", "who_its_for"],
    aliases: {
      english: [
        "how do you onboard vendors/clients on the erp",
        "how do you onboard vendors",
        "how do you onboard clients",
        "how does vendor onboarding work",
      ],
    },
    answer: {
      english:
        "Vendors are set up in the contracts module and mapped to the specific milestones they're responsible for, so their payments and data stay tied to their scope of work. Client-side access is set up for project visibility on the dashboard. Exact onboarding steps can vary by setup — happy to have our team walk you through it in a quick demo.",
    },
  },
  {
    id: "get_started",
    question: "How do we get started?",
    related: ["onboarding", "who_its_for", "key_benefits", "platform_overview"],
    aliases: {
      english: [
        "how do we get started",
        "can we get a demo",
        "how to request a demo",
        "how do we sign up",
      ],
      hindi: [
        "हम कैसे शुरू करें",
        "क्या डेमो मिल सकता है",
        "साइन अप कैसे करें",
      ],
      hinglish: [
        "hum kaise shuru karein",
        "kya demo mil sakta hai",
        "sign up kaise karein",
      ],
    },
    answer: {
      english:
        "Great — please share your company name, contact number, and a bit about your current project/contractor workflow, and our team will set up a walkthrough demo tailored to how your EPC operations actually run.",
      hindi:
        "बढ़िया — कृपया अपनी कंपनी का नाम, कॉन्टैक्ट नंबर, और अपने current प्रोजेक्ट/कॉन्ट्रैक्टर वर्कफ़्लो के बारे में थोड़ा बताएं, हमारी टीम आपके EPC ऑपरेशन्स के हिसाब से एक walkthrough डेमो सेट कर देगी।",
      hinglish:
        "Badhiya — please apni company ka naam, contact number, aur apne current project/contractor workflow ke baare mein thoda bata dijiye, hamari team aapke EPC operations ke hisaab se ek walkthrough demo set kar degi.",
    },
  },
  {
    id: "contact_human",
    aliases: {
      english: [
        "i want to talk to a real person",
        "connect me with your team",
        "how can i contact you",
        "i want a callback",
      ],
      hindi: [
        "मुझे किसी व्यक्ति से बात करनी है",
        "मुझे आपकी टीम से बात करनी है",
        "मुझे कॉलबैक चाहिए",
      ],
      hinglish: [
        "mujhe kisi insaan se baat karni hai",
        "mujhe aapki team se baat karni hai",
        "mujhe callback chahiye",
      ],
    },
    answer: {
      english:
        "Sure! Please share your name, phone number, and company, and our team will call you back shortly to discuss your requirement in detail.",
      hindi:
        "बिल्कुल! कृपया अपना नाम, फ़ोन नंबर और कंपनी बताएं, हमारी टीम जल्द ही आपको कॉल करके आपकी ज़रूरत पर विस्तार से बात करेगी।",
      hinglish:
        "Bilkul! Please apna naam, phone number aur company share kijiye, hamari team jaldi hi aapko call karke aapki requirement pe detail mein baat karegi.",
    },
  },
];

// General-purpose fallback order used to fill out follow-up suggestions when
// a topic's own `related` list runs short (or there was no FAQ match at all,
// e.g. the AI answered) — keeps the suggestion chain going indefinitely.
const DEFAULT_CHAIN_ORDER = [
  "platform_overview",
  "field_data_capture",
  "milestone_mapping",
  "vendor_payment",
  "inspection_signoff",
  "ai_assistant_features",
  "dashboard",
  "reports_types",
  "field_to_progress_report",
  "key_benefits",
  "warehouse",
  "onboarding",
  "who_its_for",
  "get_started",
];

export default faqData;
export { DEFAULT_CHAIN_ORDER };
