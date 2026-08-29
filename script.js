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

let currentUser = {
    role: "",
    name: "",
    id: "",
    year: "",
    semester: "",
    email: ""
};

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

function selectRole(role) {
    currentUser.role = role;
    document.getElementById('auth-heading').innerText = `${role.charAt(0).toUpperCase() + role.slice(1)} Login`;
    document.getElementById('auth-subtitle').innerText = `Enter your credentials to launch session`;
    switchView('view-auth');
}

function handleLogin(event) {
    event.preventDefault();
    
    currentUser.name = document.getElementById('input-name').value;
    currentUser.id = document.getElementById('input-id').value;
    currentUser.year = document.getElementById('input-year').value;
    currentUser.semester = document.getElementById('input-sem').value;
    currentUser.email = document.getElementById('input-email').value;

    // Update Sidebar Session Info Box
    document.getElementById('user-session-info').innerHTML = `
        <strong>${currentUser.name}</strong>
        <span>ID: ${currentUser.id}</span><br>
        <span>${currentUser.year} • ${currentUser.semester}</span>
    `;

    document.getElementById('user-role-badge').innerText = currentUser.role.toUpperCase() + " PORTAL";
    
    buildSidebar(currentUser.role);
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

// Full interactive dashboard component rendering
function loadTab(tabId) {
    const contentBox = document.getElementById('tab-content');
    document.getElementById('page-title').innerText = tabId.charAt(0).toUpperCase() + tabId.slice(1);
    
    let htmlContent = "";

    // ==========================================
    // 1. STUDENT PORTAL TABS
    // ==========================================
    if (currentUser.role === 'student') {
        if (tabId === 'dashboard') {
            htmlContent = `
                <h2 style="margin-bottom: 6px;">Student Overview</h2>
                <p style="font-size: 11px; color: var(--muted); text-transform: uppercase; margin-bottom: 16px;">Welcome back, ${currentUser.name} (${currentUser.id})</p>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 20px;">
                    <div style="background:#fff; padding:15px; border-radius:3px; border:1px solid #e8d8cc;">
                        <div style="font-size:10px; color:var(--muted); text-transform:uppercase;">Risk Probability</div>
                        <div style="font-size:20px; font-weight:bold; color:var(--teal); margin-top:4px;">16% <span style="font-size:11px; color:var(--teal);">(Low Risk)</span></div>
                    </div>
                    <div style="background:#fff; padding:15px; border-radius:3px; border:1px solid #e8d8cc;">
                        <div style="font-size:10px; color:var(--muted); text-transform:uppercase;">Current Term</div>
                        <div style="font-size:18px; font-weight:bold; color:var(--warm); margin-top:4px;">${currentUser.semester}</div>
                    </div>
                    <div style="background:#fff; padding:15px; border-radius:3px; border:1px solid #e8d8cc;">
                        <div style="font-size:10px; color:var(--muted); text-transform:uppercase;">Attendance Rate</div>
                        <div style="font-size:20px; font-weight:bold; color:var(--peach); margin-top:4px;">94%</div>
                    </div>
                </div>
                <div style="background:#fff; padding:16px; border-radius:3px; border:1px solid #e8d8cc;">
                    <h3 style="font-size: 15px; margin-bottom: 8px;">📢 AI Retention Watch</h3>
                    <p style="font-size: 13px; color: var(--warm); line-height: 1.5;">Hello ${currentUser.name}! Your engagement metrics for <strong>${currentUser.year}</strong> look steady. Keep submitting assignments on time to maintain your low-risk standing.</p>
                </div>
            `;
        } else if (tabId === 'progress') {
            htmlContent = `
                <h2 style="margin-bottom: 8px;">Academic Progress</h2>
                <div class="divider"></div>
                <ul style="list-style: none; font-size: 13px; display: flex; flex-direction: column; gap: 10px;">
                    <li style="background:#fff; padding:12px; border:1px solid #e8d8cc; border-radius:3px;">📚 Core Subject Module — <strong>Status: On Track (89%)</strong></li>
                    <li style="background:#fff; padding:12px; border:1px solid #e8d8cc; border-radius:3px;">🧠 Applied Lab Works — <strong>Status: Completed</strong></li>
                    <li style="background:#fff; padding:12px; border:1px solid #e8d8cc; border-radius:3px;">⚡ Mid-term Evaluation — <strong>Score: Clear</strong></li>
                </ul>
            `;
        } else if (tabId === 'counselor') {
            htmlContent = `
                <h2 style="margin-bottom: 8px;">AI Counselor Interactive Chat</h2>
                <div class="divider"></div>
                <div id="chat-window" style="background:#fff; border:1px solid #e8d8cc; border-radius:3px; padding:15px; height:180px; display:flex; flex-direction:column; justify-content:flex-start; gap:8px; margin-bottom:10px; overflow-y:auto;">
                    <div style="background:var(--cream); padding:8px 12px; border-radius:4px; font-size:13px; align-self:flex-start;">Hello ${currentUser.name}! I am your EduGuard AI Counselor for <strong>${currentUser.semester}</strong>. What can I help you navigate today?</div>
                </div>
                <div style="display:flex; gap:8px;">
                    <input type="text" id="chat-input" placeholder="Type a message to your AI Counselor..." style="flex-grow:1; background:#fff; border:1px solid #e8d8cc; padding:10px; border-radius:3px; font-family:'Josefin Sans'; font-size:13px;" />
                    <button style="width:auto; padding:0 20px;" onclick="sendAIChatMessage()">Send</button>
                </div>
            `;
        } else if (tabId === 'support') {
            htmlContent = `
                <h2 style="margin-bottom: 8px;">Assigned Support Plan</h2>
                <div class="divider"></div>
                <div style="background:#fff; padding:16px; border:1px solid #e8d8cc; border-radius:3px; font-size:13px; line-height:1.6;">
                    <p><strong>Enrolled ID:</strong> ${currentUser.id}</p>
                    <p style="margin-top:6px;"><strong>Assigned Counselor Route:</strong> Automated Academic Success Track</p>
                    <p style="margin-top:6px;"><strong>Status:</strong> Active & Monitored</p>
                </div>
            `;
        } else if (tabId === 'profile') {
            htmlContent = `
                <h2 style="margin-bottom: 8px;">Student Profile</h2>
                <div class="divider"></div>
                <div style="background:#fff; padding:16px; border:1px solid #e8d8cc; border-radius:3px; font-size:13px; line-height:1.8;">
                    <p><strong>Full Name:</strong> ${currentUser.name}</p>
                    <p><strong>Student ID / Roll No:</strong> ${currentUser.id}</p>
                    <p><strong>Institutional Email:</strong> ${currentUser.email}</p>
                    <p><strong>Academic Standing:</strong> ${currentUser.year} (${currentUser.semester})</p>
                </div>
            `;
        }
    } 
    
    // ==========================================
    // 2. FACULTY PORTAL TABS
    // ==========================================
    else if (currentUser.role === 'faculty') {
        if (tabId === 'dashboard') {
            htmlContent = `
                <h2 style="margin-bottom: 6px;">Faculty Control Hub</h2>
                <p style="font-size: 11px; color: var(--muted); text-transform: uppercase; margin-bottom: 16px;">Advisor: ${currentUser.name} (${currentUser.id})</p>
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
                                <td style="padding:10px;"><button style="width:auto; padding:4px 10px; font-size:10px;" onclick="alert('Intervention protocol deployed successfully.')">Deploy Plan</button></td>
                            </tr>
                            <tr>
                                <td style="padding:10px;">STU-112</td>
                                <td style="padding:10px;">Priya Nair</td>
                                <td style="padding:10px; color:#e6a15c; font-weight:bold;">64% (Moderate)</td>
                                <td style="padding:10px; color:var(--muted);">Midterm dip</td>
                                <td style="padding:10px;"><button style="width:auto; padding:4px 10px; font-size:10px;" onclick="alert('Intervention protocol deployed successfully.')">Deploy Plan</button></td>
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
                    <p>Managing workflows under advisor account: <strong>${currentUser.email}</strong></p>
                </div>
            `;
        } else if (tabId === 'analytics') {
            htmlContent = `
                <h2 style="margin-bottom: 8px;">Cohort Analytics & Trends</h2>
                <div class="divider"></div>
                <div style="background:#fff; padding:16px; border:1px solid #e8d8cc; border-radius:3px; font-size:13px; line-height:1.6;">
                    <p><strong>Department Retention Rate:</strong> 94.2%</p>
                </div>
            `;
        } else if (tabId === 'profile') {
            htmlContent = `
                <h2 style="margin-bottom: 8px;">Faculty Profile</h2>
                <div class="divider"></div>
                <div style="background:#fff; padding:16px; border:1px solid #e8d8cc; border-radius:3px; font-size:13px; line-height:1.8;">
                    <p><strong>Name:</strong> ${currentUser.name}</p>
                    <p><strong>Faculty ID:</strong> ${currentUser.id}</p>
                    <p><strong>Email:</strong> ${currentUser.email}</p>
                </div>
            `;
        }
    } 
    
    // ==========================================
    // 3. COUNSELOR PORTAL TABS
    // ==========================================
    else if (currentUser.role === 'counselor') {
        if (tabId === 'dashboard' || tabId === 'priority') {
            htmlContent = `
                <h2 style="margin-bottom: 6px;">Counselor Priority Queue</h2>
                <p style="font-size: 11px; color: var(--muted); text-transform: uppercase; margin-bottom: 16px;">Logged in as Counselor: ${currentUser.name}</p>
                <div style="background:#fff; border:1px solid #e8d8cc; border-radius:3px; padding:15px; margin-bottom:12px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                        <strong style="font-size:14px; color:var(--warm);">Vikram Malhotra (STU-105)</strong>
                        <span style="background:var(--coral); color:#fff; padding:2px 6px; font-size:9px; border-radius:2px;">89% Risk</span>
                    </div>
                    <p style="font-size:12px; color:var(--muted); margin-bottom:10px;">Primary Flag: Severe drop in attendance.</p>
                    <button style="width:auto; padding:6px 14px; font-size:10px;" onclick="alert('Opening case files...')">Review Case File</button>
                </div>
            `;
        } else if (tabId === 'details') {
            htmlContent = `
                <h2 style="margin-bottom: 8px;">Student Details Directory</h2>
                <div class="divider"></div>
                <div style="background:#fff; padding:16px; border:1px solid #e8d8cc; border-radius:3px; font-size:13px; line-height:1.6;">
                    <p>Select student files to review background histories.</p>
                </div>
            `;
        } else if (tabId === 'plans') {
            htmlContent = `
                <h2 style="margin-bottom: 8px;">Intervention Plans Repository</h2>
                <div class="divider"></div>
                <div style="background:#fff; padding:16px; border:1px solid #e8d8cc; border-radius:3px; font-size:13px; line-height:1.6;">
                    <p>Active Blueprints: 3 tailored counselor plans running.</p>
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
                </div>
            `;
        }
    }

    contentBox.innerHTML = htmlContent;
}

// Live interactive AI Counselor chat response simulator
function sendAIChatMessage() {
    const inputField = document.getElementById('chat-input');
    const chatWindow = document.getElementById('chat-window');
    const userText = inputField.value.trim();
    
    if (!userText) return;

    // Append user message
    chatWindow.innerHTML += `<div style="background:var(--teal); color:#fff; padding:8px 12px; border-radius:4px; font-size:13px; align-self:flex-end; max-width: 80%;">${userText}</div>`;
    inputField.value = "";
    chatWindow.scrollTop = chatWindow.scrollHeight;

    // Simulate smart AI response after a brief pause
    setTimeout(() => {
        let aiReply = `I've logged your query regarding your coursework for ${currentUser.semester}. Keep up the great focus, ${currentUser.name}!`;
        const lower = userText.toLowerCase();
        
        if (lower.includes('stress') || lower.includes('anxiety')) {
            aiReply = `I understand feeling overwhelmed in ${currentUser.year}, ${currentUser.name}. Let's schedule a short wellness check-in with your departmental counselor soon.`;
        } else if (lower.includes('grade') || lower.includes('exam')) {
            aiReply = `Your academic telemetry indicates stable performance. Check the 'My Progress' tab for detailed rubric breakdowns.`;
        }

        chatWindow.innerHTML += `<div style="background:var(--cream); padding:8px 12px; border-radius:4px; font-size:13px; align-self:flex-start; max-width: 80%;">${aiReply}</div>`;
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }, 600);
}