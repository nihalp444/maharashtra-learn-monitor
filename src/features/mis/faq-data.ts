export interface FAQItem {
  id: string;
  category: "student" | "courses" | "assessment" | "admin" | "account";
  questionEn: string;
  questionMr: string;
  answerEn: string;
  answerMr: string;
  action?: {
    labelEn: string;
    labelMr: string;
    targetUrl: string;
  };
}

export const FAQ_DATA: FAQItem[] = [
  {
    id: "faq-1",
    category: "student",
    questionEn: "How do I switch between Student profiles (Age Groups 6–10, 11–14, 15–18)?",
    questionMr: "विद्यार्थी प्रोफाईल (वय गट ६-१०, ११-१४, १५-१८) मध्ये कसे बदलावे?",
    answerEn: "You can click on your profile avatar in the top navigation bar to open the user menu. From there, select 'Switch Profile' or log in using demo accounts aarav6 (Primary 6-10), aarav11 (Middle 11-14), or aarav15 (Secondary/Higher 15-18).",
    answerMr: "वरच्या नेव्हिगेशन पट्टीतील तुमच्या प्रोफाइल चिन्हावर क्लिक करून यूजर मेनू उघडा. तेथून 'Switch Profile' निवडा किंवा aarav6 (प्राथमिक ६-१०), aarav11 (माध्यमिक ११-१४) अथवा aarav15 (उच्च माध्यमिक १५-१८) या डेमो खात्यांद्वारे प्रवेश करा.",
    action: {
      labelEn: "Go to Dashboard",
      labelMr: "डॅशबोर्डवर जा",
      targetUrl: "/dashboard",
    },
  },
  {
    id: "faq-2",
    category: "courses",
    questionEn: "Where can I view video lectures and learning materials?",
    questionMr: "व्हिडिओ लेक्चर्स आणि अभ्यास साहित्य कुठे पाहता येईल?",
    answerEn: "Go to the Dashboard and scroll down to the 'My Learning' section or click 'Continue Learning' on your active course card. You can also view structured schedules in the 'Course Planner' page.",
    answerMr: "डॅशबोर्डवर जाऊन 'माझे शिक्षण' (My Learning) विभागात स्क्रोल करा किंवा चालू कोर्स कार्डवर 'शिकणे सुरू ठेवा' क्लिक करा. आपण 'Course Planner' पानावर वेळापत्रक आणि लेक्चर्स देखील पाहू शकता.",
    action: {
      labelEn: "Open Course Planner",
      labelMr: "कोर्स प्लॅनर उघडा",
      targetUrl: "/course-planner",
    },
  },
  {
    id: "faq-3",
    category: "courses",
    questionEn: "How do I customize my learning subject preferences?",
    questionMr: "माझ्या आवडीचे विषय आणि पसंतीची भाषा कशी बदलायची?",
    answerEn: "Click on your profile avatar in the header and choose 'Learning Preferences', or click 'Set Preferences Now' on the dashboard banner. You can pick your favourite subjects and preferred medium of instruction (English or Marathi).",
    answerMr: "हेडरमधील प्रोफाइलवर क्लिक करून 'Learning Preferences' निवडा किंवा डॅशबोर्ड बॅनरवरील 'आत्ताच आवडी निवडा' वर क्लिक करा. आपण आपले आवडते विषय आणि माध्यम (इंग्रजी किंवा मराठी) निवडू शकता.",
    action: {
      labelEn: "View Dashboard",
      labelMr: "डॅशबोर्ड पहा",
      targetUrl: "/dashboard",
    },
  },
  {
    id: "faq-4",
    category: "assessment",
    questionEn: "Where can I check tests, assessments, and scholarship opportunities?",
    questionMr: "चाचण्या, मूल्यमापन आणि शिष्यवृत्ती योजना कुठे पाहू शकता?",
    answerEn: "Navigate to the 'Assessments & Scholarships' section in the navigation menu. Here you will find upcoming statewide assessments, practice quizzes, and MBOCWWB welfare scholarships eligibility details.",
    answerMr: "नेव्हिगेशन मेनूमधील 'मूल्यमापन व शिष्यवृत्ती' (Assessments & Scholarships) पर्यायावर क्लिक करा. येथे राज्यस्तरीय मूल्यमापन चाचण्या, सराव प्रश्नमंजुषा आणि शिष्यवृत्ती माहिती उपलब्ध आहे.",
    action: {
      labelEn: "Open Assessments & Scholarships",
      labelMr: "मूल्यमापन व शिष्यवृत्ती उघडा",
      targetUrl: "/assessments-scholarships",
    },
  },
  {
    id: "faq-5",
    category: "student",
    questionEn: "How can I view my badges, certificates, and leaderboard ranking?",
    questionMr: "माझे बॅजेस, प्रमाणपत्रे आणि गुणवत्ता यादी (लीडरबोर्ड) कुठे दिसेल?",
    answerEn: "Open the 'Achievements & Leadership' page from the navigation bar. You will see earned badges, learning streak counters, certificate downloads, and state/district leaderboard rankings.",
    answerMr: "नेव्हिगेशन पट्टीमधून 'उपलब्धी व नेतृत्व' (Achievements & Leadership) पेज उघडा. तेथे मिळवलेले बॅजेस, स्ट्रीक दिवस, प्रमाणपत्रे आणि राज्य/जिल्हा क्रमवारी दिसेल.",
    action: {
      labelEn: "View Achievements",
      labelMr: "उपलब्धी पहा",
      targetUrl: "/achievements-leadership",
    },
  },
  {
    id: "faq-6",
    category: "admin",
    questionEn: "How do District Welfare Officers access district monitoring & taluka analytics?",
    questionMr: "जिल्हा कल्याण अधिकारी जिल्हा व तालुका निहाय विश्लेषण कसे पाहू शकतात?",
    answerEn: "Log in with an administrator role or visit 'District Analytics' from the top bar. You can view 36 Maharashtra districts, engagement percentages, active registrations, drop-out risks, and taluka-level breakdowns.",
    answerMr: "प्रशासक (Admin) म्हणून लॉगिन करा किंवा वरच्या पट्टीतील 'District Analytics' वर जा. तेथे महाराष्ट्रातील ३६ जिल्हे, सक्रिय नोंदणी टक्केवारी आणि तालुका निहाय सविस्तर माहिती उपलब्ध आहे.",
    action: {
      labelEn: "Go to District Analytics",
      labelMr: "जिल्हा विश्लेषणावर जा",
      targetUrl: "/district-analytics",
    },
  },
  {
    id: "faq-7",
    category: "admin",
    questionEn: "How can officials generate monthly and quarterly MIS reports?",
    questionMr: "मासिक आणि त्रैमासिक MIS अहवाल कसे तयार व डाउनलोड करावेत?",
    answerEn: "Visit the 'Reports & Insights' section to export CSV/PDF reports covering enrollment trends, assessment averages, course completions, and district KPIs.",
    answerMr: "'Reports & Insights' विभागाला भेट देऊन नोंदणी, मूल्यमापन प्रगती आणि जिल्हा निहाय कामगिरीचे CSV/PDF अहवाल डाउनलोड करा.",
    action: {
      labelEn: "Open Reports",
      labelMr: "अहवाल उघडा",
      targetUrl: "/reports",
    },
  },
  {
    id: "faq-8",
    category: "account",
    questionEn: "How can I switch the portal language between Marathi and English?",
    questionMr: "पोर्टलची भाषा मराठी आणि इंग्रजीमध्ये कशी बदलावी?",
    answerEn: "Click the Language toggle (मराठी / English) in the top header right next to the notification bell icon. The portal will immediately update all content and navigation.",
    answerMr: "वरच्या हेडरमध्ये उजव्या बाजूला असलेल्या भाषा बटणावर (मराठी / English) क्लिक करा. संपूर्ण डॅशबोर्ड व नेव्हिगेशन तात्काळ निवडलेल्या भाषेत दिसेल.",
  },
  {
    id: "faq-9",
    category: "account",
    questionEn: "Who can I contact for technical support or helpline assistance?",
    questionMr: "तांत्रिक अडचण किंवा मदतीसाठी कोणाशी संपर्क साधावा?",
    answerEn: "You can reach the MBOCWWB State Mission Directorate Helpdesk at toll-free 1800-889-6889 or email support@mbocwwb.gov.in. District Welfare Officers are also available at your local district collectorate.",
    answerMr: "महाराष्ट्र इमारत व इतर बांधकाम कामगार कल्याण मंडळाच्या टोल-फ्री क्रमांक १८००-८८९-६८८९ वर किंवा support@mbocwwb.gov.in वर ईमेल करू शकता.",
  },
];
