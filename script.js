// Navigation configuration based on your requested breakdown
const roleNavs = {
    student: [
        { id: "dashboard", label: "🏠 Dashboard" },
        { id: "progress", label: "📊 My Progress" },
        { id: "counselor", label: "💬 AI Counselor" },
        { id: "support", label: "📝 Support Plan" },
        { id: "profile", label: "👤 Profile" }
    ],
    faculty: [
        { id: "dashboard", label: "🏠 Dashboard" },
        { id: "students", label: "👥 Students" },
        { id: "risk", label: "🔎 Risk Analysis" },
        { id: "interventions", label: "🧑‍🏫 Interventions" },
        { id: "analytics", label: "📈 Analytics" },
        { id: "profile", label: "👤 Profile" }
    ],
    counselor: [
        { id: "dashboard", label: "🏠 Dashboard" },
        { id: "priority", label: "🚨 Priority Cases" },
        { id: "details", label: "👤 Student Details" },
        { id: "plans", label: "📝 Intervention Plans" },
        { id: "followups", label: "📅 Follow-ups" },
        { id: "outcomes", label: "📈 Outcomes" }
    ]
};

let currentRole = "";

function switchView(viewId) {
    document.querySelectorAll('.view-section').forEach(section => {
        section.classList.remove('active');
    });
    
    const target = document.getElementById(viewId);
    if (target) {
        target.classList.add('active');
        if (viewId === 'view-dashboard') {
            target.style.display = 'flex';
        } else {
            target.style.display = '';
        }
    }
}

function loginAs(role) {
    currentRole = role;
    document.getElementById('user-role-badge').innerText = role.toUpperCase() + " PORTAL";
    
    buildSidebar(role);
    switchView('view-dashboard');
    loadTab('dashboard');
}

function buildSidebar(role) {
    const navContainer = document.getElementById('sidebar-nav-links');
    navContainer.innerHTML = "";
    
    roleNavs[role].forEach((item, index) => {
        const btn = document.createElement('button');
        btn.className = `nav-link ${index === 0 ? 'active' : ''}`;
        btn.innerText = item.label;
        btn.onclick = () => {
            document.querySelectorAll('.nav-link').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            loadTab(item.id);
        };
        navContainer.appendChild(btn);
    });
}

// Full interactive dashboard component rendering based on role and tab
function loadTab(tabId) {
    const contentBox = document.getElementById('tab-content');
    document.getElementById('page-title').innerText = tabId.charAt(0).toUpperCase() + tabId.slice(1);
    
    let htmlContent = "";

    // ==========================================
    // 1. STUDENT PORTAL TABS
    // ==========================================
    if (currentRole === 'student') {
        if (tabId === 'dashboard') {
            htmlContent = `
                <h2 style="margin-bottom: 6px;">Student Overview</h2>
                <p style="font-size: 11px; color: var(--muted); text-transform: uppercase; margin-bottom: 16px;">Welcome back, Aarav Sharma (STU-101)</p>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 20px;">
                    <div style="background:#fff; padding:15px; border-radius:3px; border:1px solid #e8d8cc;">
                        <div style="font-size:10px; color:var(--muted); text-transform:uppercase;">Risk Probability</div>
                        <div style="font-size:20px; font-weight:bold; color:var(--teal); margin-top:4px;">18% <span style="font-size:11px; color:var(--teal);">(Low Risk)</span></div>
                    </div>
                    <div style="background:#fff; padding:15px; border-radius:3px; border:1px solid #e8d8cc;">
                        <div style="font-size:10px; color:var(--muted); text-transform:uppercase;">Attendance Rate</div>
                        <div style="font-size:20px; font-weight:bold; color:var(--warm); margin-top:4px;">92%</div>
                    </div>
                    <div style="background:#fff; padding:15px; border-radius:3px; border:1px solid #e8d8cc;">
                        <div style="font-size:10px; color:var(--muted); text-transform:uppercase;">Pending Actions</div>
                        <div style="font-size:20px; font-weight:bold; color:var(--coral); margin-top:4px;">1 Item</div>
                    </div>
                </div>
                <div style="background:#fff; padding:16px; border-radius:3px; border:1px solid #e8d8cc;">
                    <h3 style="font-size: 15px; margin-bottom: 8px;">📢 Recent System Alerts</h3>
                    <p style="font-size: 13px; color: var(--warm); line-height: 1.5;">Your midterm feedback has been processed. No urgent intervention required. Keep up the consistent submission schedule!</p>
                </div>
            `;
        } else if (tabId === 'progress') {
            htmlContent = `
                <h2 style="margin-bottom: 8px;">Academic Progress</h2>
                <div class="divider"></div>
                <ul style="list-style: none; font-size: 13px; display: flex; flex-direction: column; gap: 10px;">
                    <li style="background:#fff; padding:12px; border:1px solid #e8d8cc; border-radius:3px;">📚 Data Structures & Algorithms — <strong>Grade: A (88%)</strong></li>
                    <li style="background:#fff; padding:12px; border:1px solid #e8d8cc; border-radius:3px;">🧠 Machine Learning Fundamentals — <strong>Grade: B+ (79%)</strong></li>
                    <li style="background:#fff; padding:12px; border:1px solid #e8d8cc; border-radius:3px;">⚡ Software Engineering Lab — <strong>Grade: A- (84%)</strong></li>
                </ul>
            `;
        } else if (tabId === 'counselor') {
            htmlContent = `
                <h2 style="margin-bottom: 8px;">AI Counselor Chat Interface</h2>
                <div class="divider"></div>
                <div style="background:#fff; border:1px solid #e8d8cc; border-radius:3px; padding:15px; height:180px; display:flex; flex-direction:column; justify-content:flex-end; gap:8px; margin-bottom:10px; overflow-y:auto;">
                    <div style="background:var(--cream); padding:8px 12px; border-radius:4px; font-size:13px; align-self:flex-start;">Hello Aarav! I'm your AI Counselor. How can I help you manage your coursework or stress levels today?</div>
                </div>
                <div style="display:flex; gap:8px;">
                    <input type="text" placeholder="Ask AI Counselor anything..." style="flex-grow:1; background:#fff; border:1px solid #e8d8cc; padding:10px; border-radius:3px; font-family:'Josefin Sans'; font-size:13px;" />
                    <button style="width:auto; padding:0 20px;" onclick="alert('Message sent to EduGuard AI Counselor!')">Send</button>
                </div>
            `;
        } else if (tabId === 'support') {
            htmlContent = `
                <h2 style="margin-bottom: 8px;">Assigned Support Plan</h2>
                <div class="divider"></div>
                <div style="background:#fff; padding:16px; border:1px solid #e8d8cc; border-radius:3px; font-size:13px; line-height:1.6;">
                    <p><strong>Status:</strong> Active & Monitored</p>
                    <p style="margin-top:8px;"><strong>Recommendations:</strong></p>
                    <ul style="padding-left:20px; color:var(--muted); margin-top:4px;">
                        <li>Review module notes on neural network architectures.</li>
                        <li>Optional office hours check-in scheduled bi-weekly.</li>
                    </ul>
                </div>
            `;
        } else if (tabId === 'profile') {
            htmlContent = `
                <h2 style="margin-bottom: 8px;">Student Profile</h2>
                <div class="divider"></div>
                <div style="background:#fff; padding:16px; border:1px solid #e8d8cc; border-radius:3px; font-size:13px; line-height:1.8;">
                    <p><strong>Full Name:</strong> Aarav Sharma</p>
                    <p><strong>Student ID:</strong> STU-101</p>
                    <p><strong>Department:</strong> Computer Science & Engineering</p>
                    <p><strong>Enrolled Term:</strong> Fall 2024 - Spring 2028</p>
                </div>
            `;
        }
    } 
    
    // ==========================================
    // 2. FACULTY PORTAL TABS
    // ==========================================
    else if (currentRole === 'faculty') {
        if (tabId === 'dashboard') {
            htmlContent = `
                <h2 style="margin-bottom: 6px;">Faculty Control Hub</h2>
                <p style="font-size: 11px; color: var(--muted); text-transform: uppercase; margin-bottom: 16px;">Department Overview & Risk Registry</p>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 20px;">
                    <div style="background:#fff; padding:15px; border-radius:3px; border:1px solid #e8d8cc;">
                        <div style="font-size:10px; color:var(--muted); text-transform:uppercase;">Total Cohort</div>
                        <div style="font-size:20px; font-weight:bold; color:var(--warm); margin-top:4px;">142 Students</div>
                    </div>
                    <div style="background:#fff; padding:15px; border-radius:3px; border:1px solid #e8d8cc;">
                        <div style="font-size:10px; color:var(--muted); text-transform:uppercase;">High Risk Flags</div>
                        <div style="font-size:20px; font-weight:bold; color:var(--coral); margin-top:4px;">8 Students</div>
                    </div>
                    <div style="background:#fff; padding:15px; border-radius:3px; border:1px solid #e8d8cc;">
                        <div style="font-size:10px; color:var(--muted); text-transform:uppercase;">Active Interventions</div>
                        <div style="font-size:20px; font-weight:bold; color:var(--teal); margin-top:4px;">5 Workflows</div>
                    </div>
                </div>
            `;
        } else if (tabId === 'students' || tabId === 'risk') {
            htmlContent = `
                <h2 style="margin-bottom: 8px;">Student Risk Analysis Registry</h2>
                <div class="divider"></div>
                <div style="background:#fff; border:1px solid #e8d8cc; border-radius:3px; overflow:hidden;">
                    <table style="width:100%; border-collapse:collapse; font-size:12px; text-align:left;">
                        <thead>
                            <tr style="background:var(--cream); border-bottom:1px solid #e8d8cc; color:var(--muted);">
                                <th style="padding:10px;">ID</th>
                                <th style="padding:10px;">Name</th>
                                <th style="padding:10px;">Risk Score</th>
                                <th style="padding:10px;">Primary Flag</th>
                                <th style="padding:10px;">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style="border-bottom:1px solid #f3e5dc;">
                                <td style="padding:10px;">STU-105</td>
                                <td style="padding:10px;">Vikram Malhotra</td>
                                <td style="padding:10px; color:var(--coral); font-weight:bold;">89% (High)</td>
                                <td style="padding:10px; color:var(--muted);">Low Attendance</td>
                                <td style="padding:10px;"><button style="width:auto; padding:4px 10px; font-size:10px;" onclick="alert('Intervention plan deployed for Vikram.')">Deploy Plan</button></td>
                            </tr>
                            <tr>
                                <td style="padding:10px;">STU-112</td>
                                <td style="padding:10px;">Priya Nair</td>
                                <td style="padding:10px; color:#e6a15c; font-weight:bold;">64% (Moderate)</td>
                                <td style="padding:10px; color:var(--muted);">Midterm dip</td>
                                <td style="padding:10px;"><button style="width:auto; padding:4px 10px; font-size:10px;" onclick="alert('Intervention plan deployed for Priya.')">Deploy Plan</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            `;
        } else if (tabId === 'interventions') {
            htmlContent = `
                <h2 style="margin-bottom: 8px;">Active Interventions Management</h2>
                <div class="divider"></div>
                <div style="background:#fff; padding:15px; border:1px solid #e8d8cc; border-radius:3px; font-size:13px; line-height:1.6;">
                    <p><strong>Ongoing Automated Outreach:</strong> 5 student schedules are currently tracking with faculty advisors.</p>
                    <ul style="padding-left:20px; color:var(--muted); margin-top:8px;">
                        <li>Peer mentoring check-in sessions scheduled for Tuesdays.</li>
                        <li>Automated financial aid guidance flags enabled.</li>
                    </ul>
                </div>
            `;
        } else if (tabId === 'analytics') {
            htmlContent = `
                <h2 style="margin-bottom: 8px;">Cohort Analytics & Trends</h2>
                <div class="divider"></div>
                <div style="background:#fff; padding:16px; border:1px solid #e8d8cc; border-radius:3px; font-size:13px; line-height:1.6;">
                    <p><strong>Retention Rate:</strong> 94.2% across department.</p>
                    <p style="margin-top:6px;"><strong>Primary Risk Driver:</strong> Early semester assignment delays account for 40% of flagged indices.</p>
                </div>
            `;
        } else if (tabId === 'profile') {
            htmlContent = `
                <h2 style="margin-bottom: 8px;">Faculty Profile</h2>
                <div class="divider"></div>
                <div style="background:#fff; padding:16px; border:1px solid #e8d8cc; border-radius:3px; font-size:13px; line-height:1.8;">
                    <p><strong>Name:</strong> Dr. Rajesh Kumar</p>
                    <p><strong>Role:</strong> Senior Faculty Advisor & Professor</p>
                    <p><strong>Department:</strong> Computer Science & Engineering</p>
                </div>
            `;
        }
    } 
    
    // ==========================================
    // 3. COUNSELOR PORTAL TABS
    // ==========================================
    else if (currentRole === 'counselor') {
        if (tabId === 'dashboard' || tabId === 'priority') {
            htmlContent = `
                <h2 style="margin-bottom: 6px;">Counselor Priority Queue</h2>
                <p style="font-size: 11px; color: var(--muted); text-transform: uppercase; margin-bottom: 16px;">Immediate attention required cases</p>
                <div style="background:#fff; border:1px solid #e8d8cc; border-radius:3px; padding:15px; margin-bottom:12px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                        <strong style="font-size:14px; color:var(--warm);">Vikram Malhotra (STU-105)</strong>
                        <span style="background:var(--coral); color:#fff; padding:2px 6px; font-size:9px; border-radius:2px;">89% Risk</span>
                    </div>
                    <p style="font-size:12px; color:var(--muted); margin-bottom:10px;">Primary Flag: Severe drop in attendance coupled with fee balance notice.</p>
                    <button style="width:auto; padding:6px 14px; font-size:10px;" onclick="alert('Opening session files for Vikram...')">Review Case File</button>
                </div>
            `;
        } else if (tabId === 'details') {
            htmlContent = `
                <h2 style="margin-bottom: 8px;">Student Details Directory</h2>
                <div class="divider"></div>
                <div style="background:#fff; padding:16px; border:1px solid #e8d8cc; border-radius:3px; font-size:13px; line-height:1.6;">
                    <p>Select a student from the priority queue or search to load comprehensive behavioral and counseling background histories.</p>
                </div>
            `;
        } else if (tabId === 'plans') {
            htmlContent = `
                <h2 style="margin-bottom: 8px;">Intervention Plans Repository</h2>
                <div class="divider"></div>
                <div style="background:#fff; padding:16px; border:1px solid #e8d8cc; border-radius:3px; font-size:13px; line-height:1.6;">
                    <p><strong>Active Plans:</strong> 3 tailored counselor intervention blueprints currently running for at-risk cohorts.</p>
                </div>
            `;
        } else if (tabId === 'followups') {
            htmlContent = `
                <h2 style="margin-bottom: 8px;">Scheduled Follow-ups</h2>
                <div class="divider"></div>
                <div style="background:#fff; padding:16px; border:1px solid #e8d8cc; border-radius:3px; font-size:13px; line-height:1.6;">
                    <p>📅 Next session: <strong>Vikram Malhotra</strong> — Monday, 10:30 AM</p>
                </div>
            `;
        } else if (tabId === 'outcomes') {
            htmlContent = `
                <h2 style="margin-bottom: 8px;">Counseling Outcomes & Success Metrics</h2>
                <div class="divider"></div>
                <div style="background:#fff; padding:16px; border:1px solid #e8d8cc; border-radius:3px; font-size:13px; line-height:1.6;">
                    <p><strong>Successful Retentions This Term:</strong> 12 Cases</p>
                    <p style="margin-top:6px;"><strong>Average Risk Reduction Post-Counseling:</strong> -34%</p>
                </div>
            `;
        }
    }

    contentBox.innerHTML = htmlContent;
}