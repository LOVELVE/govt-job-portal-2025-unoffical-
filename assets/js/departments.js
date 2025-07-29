// Government Departments and Sources Data

const governmentSources = {
    "केंद्रीय मंत्रालय (53)": {
        icon: "🏛️",
        items: [
            { name: "कृषि और किसान कल्याण मंत्रालय", url: "https://agricoop.nic.in", status: "working" },
            { name: "आयुष मंत्रालय", url: "https://ayush.gov.in", status: "working" },
            { name: "रसायन और उर्वरक मंत्रालय", url: "https://chemicals.gov.in", status: "working" },
            { name: "नागरिक उड्डयन मंत्रालय", url: "https://civilaviation.gov.in", status: "working" },
            { name: "कोयला मंत्रालय", url: "https://coal.nic.in", status: "working" },
            { name: "वाणिज्य एवं उद्योग मंत्रालय", url: "https://commerce.gov.in", status: "working" },
            { name: "संचार मंत्रालय", url: "https://dot.gov.in", status: "working" },
            { name: "उपभोक्ता मामले मंत्रालय", url: "https://consumeraffairs.nic.in", status: "working" },
            { name: "सहकारिता मंत्रालय", url: "https://cooperation.gov.in", status: "working" },
            { name: "कॉरपोरेट कार्य मंत्रालय", url: "https://mca.gov.in", status: "working" },
            { name: "संस्कृति मंत्रालय", url: "https://indiaculture.nic.in", status: "working" },
            { name: "रक्षा मंत्रालय", url: "https://mod.gov.in", status: "working" },
            { name: "उत्तर पूर्वी क्षेत्र विकास मंत्रालय", url: "https://mdoner.gov.in", status: "working" },
            { name: "भू-विज्ञान मंत्रालय", url: "https://moes.gov.in", status: "working" },
            { name: "शिक्षा मंत्रालय", url: "https://education.gov.in", status: "working" },
            { name: "इलेक्ट्रॉनिक्स एवं सूचना प्रौद्योगिकी मंत्रालय", url: "https://meity.gov.in", status: "working" },
            { name: "पर्यावरण, वन एवं जलवायु परिवर्तन मंत्रालय", url: "https://moef.gov.in", status: "working" },
            { name: "विदेश मंत्रालय", url: "https://mea.gov.in", status: "working" },
            { name: "वित्त मंत्रालय", url: "https://finmin.nic.in", status: "working" },
            { name: "मत्स्य, पशुपालन एवं डेयरी मंत्रालय", url: "https://dahd.nic.in", status: "working" },
            { name: "खाद्य प्रसंस्करण उद्योग मंत्रालय", url: "https://mofpi.nic.in", status: "working" },
            { name: "स्वास्थ्य एवं परिवार कल्याण मंत्रालय", url: "https://mohfw.gov.in", status: "working" },
            { name: "भारी उद्योग मंत्रालय", url: "https://heavyindustries.gov.in", status: "working" },
            { name: "गृह मंत्रालय", url: "https://mha.gov.in", status: "working" },
            { name: "आवास एवं शहरी कार्य मंत्रालय", url: "https://mohua.gov.in", status: "working" },
            { name: "सूचना एवं प्रसारण मंत्रालय", url: "https://mib.gov.in", status: "working" },
            { name: "जल शक्ति मंत्रालय", url: "https://jalshakti-dowr.gov.in", status: "working" },
            { name: "श्रम एवं रोजगार मंत्रालय", url: "https://labour.gov.in", status: "working" },
            { name: "कानून एवं न्याय मंत्रालय", url: "https://lawmin.nic.in", status: "working" },
            { name: "सूक्ष्म, लघु एवं मध्यम उद्यम मंत्रालय", url: "https://msme.gov.in", status: "working" }
        ]
    },
    "बिहार सरकार (32 विभाग)": {
        icon: "🏢",
        items: [
            { name: "कृषि विभाग", url: "https://state.bihar.gov.in/agriculture", status: "working" },
            { name: "भवन निर्माण विभाग", url: "https://state.bihar.gov.in/bcd", status: "working" },
            { name: "वित्त विभाग", url: "https://state.bihar.gov.in/finance", status: "working" },
            { name: "गृह विभाग", url: "https://state.bihar.gov.in/home", status: "working" },
            { name: "स्वास्थ्य विभाग", url: "https://state.bihar.gov.in/health", status: "working" },
            { name: "सूचना तकनीकी विभाग", url: "https://dit.bihar.gov.in", status: "working" },
            { name: "शिक्षा विभाग", url: "https://state.bihar.gov.in/education", status: "working" },
            { name: "श्रम संसाधन विभाग", url: "https://state.bihar.gov.in/labourresources", status: "working" },
            { name: "ऊर्जा विभाग", url: "https://state.bihar.gov.in/energy", status: "working" },
            { name: "पर्यावरण एवं वन विभाग", url: "https://state.bihar.gov.in/environmentforest", status: "working" }
        ]
    },
    "Railway (21 RRB + 17 Zones)": {
        icon: "🚂",
        items: [
            { name: "RRB Chandigarh", url: "https://rrbcdg.gov.in", status: "working" },
            { name: "RRB Mumbai", url: "https://rrbmumbai.gov.in", status: "working" },
            { name: "RRB Kolkata", url: "https://rrbkolkata.gov.in", status: "working" },
            { name: "RRB Chennai", url: "https://rrbchennai.gov.in", status: "working" },
            { name: "RRB New Delhi", url: "https://rrbdelhi.gov.in", status: "working" },
            { name: "Eastern Railway", url: "https://er.indianrailways.gov.in", status: "working" },
            { name: "Northern Railway", url: "https://nr.indianrailways.gov.in", status: "working" },
            { name: "Western Railway", url: "https://wr.indianrailways.gov.in", status: "working" }
        ]
    },
    "Banking (60+ Banks)": {
        icon: "🏦",
        items: [
            { name: "State Bank of India", url: "https://sbi.co.in/careers", status: "working" },
            { name: "Punjab National Bank", url: "https://pnbindia.in/recruitments.aspx", status: "working" },
            { name: "Bank of Baroda", url: "https://bankofbaroda.in/careers", status: "working" },
            { name: "IBPS", url: "https://ibps.in", status: "working" },
            { name: "Reserve Bank of India", url: "https://rbi.org.in/careers", status: "working" }
        ]
    }
};

// Load sidebar content
function loadSidebarContent() {
    const container = document.getElementById('sidebarContent');
    if (!container) return;
    
    container.innerHTML = Object.entries(governmentSources).map(([category, data]) => `
        <div class="dept-category">
            <h3>${data.icon} ${category}</h3>
            ${data.items.map(item => `
                <a href="${item.url}" target="_blank" class="dept-link">
                    <span class="link-status status-${item.status}"></span>
                    ${item.name}
                    <i class="fas fa-external-link-alt" style="margin-left: auto; font-size: 0.8rem; opacity: 0.6;"></i>
                </a>
            `).join('')}
        </div>
    `).join('');
}

// Search departments
function searchDepartments(query) {
    const departments = [];
    Object.entries(governmentSources).forEach(([category, data]) => {
        data.items.forEach(item => {
            if (item.name.toLowerCase().includes(query.toLowerCase())) {
                departments.push({
                    category,
                    ...item
                });
            }
        });
    });
    return departments;
}

// Get department by URL
function getDepartmentByUrl(url) {
    for (const [category, data] of Object.entries(governmentSources)) {
        const dept = data.items.find(item => item.url === url);
        if (dept) {
            return { category, ...dept };
        }
    }
    return null;
}

// Get total sources count
function getTotalSourcesCount() {
    return Object.values(governmentSources).reduce((total, category) => {
        return total + category.items.length;
    }, 0);
}

// Get working sources count
function getWorkingSourcesCount() {
    return Object.values(governmentSources).reduce((total, category) => {
        return total + category.items.filter(item => item.status === 'working').length;
    }, 0);
}

// Export functions
window.departments = {
    governmentSources,
    loadSidebarContent,
    searchDepartments,
    getDepartmentByUrl,
    getTotalSourcesCount,
    getWorkingSourcesCount
};
