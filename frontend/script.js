// Global Application State
const state = {
  currentRole: null,
  userName: '',
  userId: '',
  userDept: '',
  userEmail: ''
};

// DOM Elements & View Routing
const views = {
  landing: document.getElementById('view-landing'),
  roleSelect: document.getElementById('view-role-select'),
  authForm: document.getElementById('view-auth-form'),
  studentDash: document.getElementById('view-student-dash'),
  facultyDash: document.getElementById('view-faculty-dash')
};

function switchView(viewName) {
  Object.values(views).forEach(v => v.classList.remove('active'));
  if (views[viewName]) {
    views[viewName].classList.add('active');
  }
}

// Navigation Event Listeners
document.getElementById('btn-get-started').addEventListener('click', () => switchView('roleSelect'));
document.getElementById('back-to-landing').addEventListener('click', () => switchView('landing'));
document.getElementById('back-to-role').addEventListener('click', () => switchView('roleSelect'));

// Role Selection Handler
document.querySelectorAll('.role-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    state.currentRole = e.target.getAttribute('data-role');
    const formTitle = document.getElementById('form-title');
    const formSubtitle = document.getElementById('form-subtitle');
    const idLabel = document.getElementById('id-label');

    if (state.currentRole === 'student') {
      formTitle.innerHTML = "Student Portal Login<span class=\"title-dot\"></span>";
      formSubtitle.textContent = "Enter your student parameters";
      idLabel.textContent = "Student ID";
    } else {
      formTitle.innerHTML = "Faculty Portal Login<span class=\"title-dot\"></span>";
      formSubtitle.textContent = "Enter your faculty parameters";
      idLabel.textContent = "Faculty ID";
    }
    switchView('authForm');
  });
});

// Authentication / Login Submission
document.getElementById('login-form').addEventListener('submit', (e) => {
  e.preventDefault();
  state.userName = document.getElementById('input-name').value;
  state.userId = document.getElementById('input-id').value;
  state.userDept = document.getElementById('input-dept').value;
  state.userEmail = document.getElementById('input-email').value;

  if (state.currentRole === 'student') {
    document.getElementById('session-student-name').textContent = state.userName;
    document.getElementById('session-student-meta').textContent = `ID: ${state.userId} | ${state.userDept}`;
    switchView('studentDash');
  } else {
    document.getElementById('session-faculty-name').textContent = state.userName;
    document.getElementById('session-faculty-meta').textContent = `ID: ${state.userId} | ${state.userDept}`;
    switchView('facultyDash');
  }
});

// Logout Handlers
document.getElementById('logout-student').addEventListener('click', () => {
  document.getElementById('login-form').reset();
  switchView('landing');
});
document.getElementById('logout-faculty').addEventListener('click', () => {
  document.getElementById('login-form').reset();
  switchView('landing');
});

// Student Dashboard Tab Switching
document.querySelectorAll('#view-student-dash .nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    document.querySelectorAll('#view-student-dash .nav-link').forEach(l => l.classList.remove('active'));
    document.querySelectorAll('#view-student-dash .tab-card').forEach(t => t.style.display = 'none');

    e.target.classList.add('active');
    const targetTabId = 'tab-' + e.target.getAttribute('data-tab');
    document.getElementById(targetTabId).style.display = 'block';
    
    document.getElementById('stud-header-title').textContent = e.target.textContent.replace(/^\d+\.\s*/, '');
  });
});

// Faculty Dashboard Tab Switching Helper
window.switchFacTab = function(tabName) {
  document.querySelectorAll('#view-faculty-dash .nav-link').forEach(l => {
    if(l.getAttribute('data-tab') === tabName) l.click();
  });
};

document.querySelectorAll('#view-faculty-dash .nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    document.querySelectorAll('#view-faculty-dash .nav-link').forEach(l => l.classList.remove('active'));
    document.querySelectorAll('#view-faculty-dash .tab-card').forEach(t => t.style.display = 'none');

    e.target.classList.add('active');
    const targetTabId = 'tab-' + e.target.getAttribute('data-tab');
    document.getElementById(targetTabId).style.display = 'block';

    document.getElementById('fac-header-title').textContent = e.target.textContent.replace(/^\d+\.\s*/, '');
  });
});

// Extensive AI Logic & Simulation Handlers
document.getElementById('btn-recalc-risk').addEventListener('click', () => {
  alert("RetroMind AI: Risk diagnostic re-run completed successfully. Telemetry is stable.");
});

document.getElementById('btn-deploy-intervention').addEventListener('click', () => {
  alert("RetroMind AI: Intervention plan successfully dispatched to student and advisor calendars.");
});

// AI Counselor Interactive Chat Simulation
const chatBox = document.getElementById('ai-chat-box');
const chatInput = document.getElementById('ai-chat-input');
const chatSend = document.getElementById('ai-chat-send');

function appendAIChat(sender, text) {
  const msgDiv = document.createElement('div');
  msgDiv.style.marginBottom = '10px';
  msgDiv.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

chatSend.addEventListener('click', () => {
  const query = chatInput.value.trim();
  if(!query) return;

  appendAIChat(state.userName || 'You', query);
  chatInput.value = '';

  setTimeout(() => {
    let aiResponse = "I am processing your academic and wellness telemetry. Keep up your consistent study rhythm and remember to take scheduled breaks!";
    const lower = query.toLowerCase();
    if(lower.includes('stress') || lower.includes('burnout') || lower.includes('tired')) {
      aiResponse = "I detect elevated stress markers. Let's schedule a 15-minute mindfulness breathing exercise or review your task prioritization queue.";
    } else if(lower.includes('grade') || lower.includes('gpa') || lower.includes('exam')) {
      aiResponse = "Your current trajectory is solid. Based on past patterns, focusing 2 extra hours on core modules will secure your target percentile.";
    }
    appendAIChat('AI Counselor', aiResponse);
  }, 700);
});

chatInput.addEventListener('keypress', (e) => {
  if(e.key === 'Enter') chatSend.click();
});
