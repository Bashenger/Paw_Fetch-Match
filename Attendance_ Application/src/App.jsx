import React, { useState, useEffect } from 'react';
import './App.css';

// 1. Static student database constant
export const STUDENTS = [
  { regNo: "24MCU01", name: "Aarav Sharma", rollNo: 1, class: "MCA A", email: "aarav.sharma@christ.edu", gender: "Male" },
  { regNo: "24MCU02", name: "Ananya Iyer", rollNo: 2, class: "MCA A", email: "ananya.iyer@christ.edu", gender: "Female" },
  { regNo: "24MCU03", name: "Devansh Patel", rollNo: 3, class: "MCA B", email: "devansh.patel@christ.edu", gender: "Male" },
  { regNo: "24MCU04", name: "Ishita Roy", rollNo: 4, class: "MCA A", email: "ishita.roy@christ.edu", gender: "Female" },
  { regNo: "24MCU05", name: "Kabir Verma", rollNo: 5, class: "MCA B", email: "kabir.verma@christ.edu", gender: "Male" },
  { regNo: "24MCU06", name: "Meera Nair", rollNo: 6, class: "MCA B", email: "meera.nair@christ.edu", gender: "Female" },
  { regNo: "24MCU07", name: "Rohan Das", rollNo: 7, class: "MCA A", email: "rohan.das@christ.edu", gender: "Male" },
  { regNo: "24MCU08", name: "Sanya Gupta", rollNo: 8, class: "MCA B", email: "sanya.gupta@christ.edu", gender: "Female" },
  { regNo: "24MCU09", name: "Tanishq Bhatia", rollNo: 9, class: "MCA A", email: "tanishq.bhatia@christ.edu", gender: "Male" },
  { regNo: "24MCU10", name: "Zara Khan", rollNo: 10, class: "MCA B", email: "zara.khan@christ.edu", gender: "Female" },
  { regNo: "24DSU01", name: "Aditya Rao", rollNo: 1, class: "MSc DS", email: "aditya.rao@christ.edu", gender: "Male" },
  { regNo: "24DSU02", name: "Bhavna Sen", rollNo: 2, class: "MSc DS", email: "bhavna.sen@christ.edu", gender: "Female" },
  { regNo: "24DSU03", name: "Chirag Malhotra", rollNo: 3, class: "MSc DS", email: "chirag.m@christ.edu", gender: "Male" },
  { regNo: "24DSU04", name: "Diya Pillai", rollNo: 4, class: "MSc DS", email: "diya.pillai@christ.edu", gender: "Female" },
  { regNo: "24DSU05", name: "Eshwar Prasad", rollNo: 5, class: "MSc DS", email: "eshwar.p@christ.edu", gender: "Male" }
];

// Helper to seed 5 weekdays of past attendance records for gorgeous visual graphs out-of-the-box
const INITIAL_ATTENDANCE = (() => {
  const mockData = {};
  let daysSeeded = 0;
  let offset = 1;
  // Seed the last 5 weekdays (excluding weekends)
  while (daysSeeded < 5) {
    const d = new Date();
    d.setDate(d.getDate() - offset);
    const dayOfWeek = d.getDay(); // 0 = Sunday, 6 = Saturday
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      const dateStr = d.toISOString().split('T')[0];
      mockData[dateStr] = {};
      STUDENTS.forEach(student => {
        const rand = Math.random();
        if (rand < 0.80) {
          mockData[dateStr][student.regNo] = 'Present';
        } else if (rand < 0.90) {
          mockData[dateStr][student.regNo] = 'Late';
        } else {
          mockData[dateStr][student.regNo] = 'Absent';
        }
      });
      daysSeeded++;
    }
    offset++;
  }
  return mockData;
})();

// SVG Inline Icons component/lookup
const Icon = ({ name, className = "" }) => {
  const icons = {
    calendar: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    users: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    chart: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    history: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    check: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    x: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    ),
    clock: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    search: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    mail: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    award: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="8" r="7" />
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
      </svg>
    ),
    download: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
    info: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    )
  };
  return icons[name] || null;
};

function App() {
  const [activeTab, setActiveTab] = useState('attendance');
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('All');
  const [selectedStudent, setSelectedStudent] = useState(null);
  
  // Custom alerts or notifications
  const [notification, setNotification] = useState(null);

  // Core Attendance State persisting in LocalStorage
  const [attendance, setAttendance] = useState(() => {
    const saved = localStorage.getItem('presence_attendance_records');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse attendance records from storage:", e);
      }
    }
    return INITIAL_ATTENDANCE;
  });

  useEffect(() => {
    localStorage.setItem('presence_attendance_records', JSON.stringify(attendance));
  }, [attendance]);

  const showToast = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Mark Status for a single student on the selectedDate
  const handleMarkStatus = (regNo, status) => {
    setAttendance(prev => {
      const dayRecords = prev[selectedDate] ? { ...prev[selectedDate] } : {};
      
      if (dayRecords[regNo] === status) {
        // Toggle off if clicking active status
        delete dayRecords[regNo];
      } else {
        dayRecords[regNo] = status;
      }

      return {
        ...prev,
        [selectedDate]: dayRecords
      };
    });
  };

  // Bulk Actions
  const handleMarkAll = (status) => {
    const classFilteredStudents = STUDENTS.filter(s => selectedClass === 'All' || s.class === selectedClass);
    setAttendance(prev => {
      const dayRecords = prev[selectedDate] ? { ...prev[selectedDate] } : {};
      classFilteredStudents.forEach(student => {
        dayRecords[student.regNo] = status;
      });
      return {
        ...prev,
        [selectedDate]: dayRecords
      };
    });
    showToast(`Marked all ${selectedClass === 'All' ? '' : selectedClass + ' '}students as ${status}`, 'success');
  };

  const handleClearAll = () => {
    setAttendance(prev => {
      const copy = { ...prev };
      delete copy[selectedDate];
      return copy;
    });
    showToast(`Cleared attendance sheet for ${selectedDate}`, 'warning');
  };

  // Get distinct classes
  const classesList = ['All', ...new Set(STUDENTS.map(s => s.class))];

  // Current records marked for selectedDate
  const currentDayRecord = attendance[selectedDate] || {};

  // Filters students based on search and class dropdown
  const filteredStudents = STUDENTS.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          student.regNo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = selectedClass === 'All' || student.class === selectedClass;
    return matchesSearch && matchesClass;
  });

  // Calculate Attendance Stats Helper
  const calculateStudentStats = (regNo) => {
    const history = Object.keys(attendance);
    let present = 0;
    let absent = 0;
    let late = 0;
    let markedDays = 0;

    history.forEach(date => {
      const status = attendance[date][regNo];
      if (status) {
        markedDays++;
        if (status === 'Present') present++;
        else if (status === 'Absent') absent++;
        else if (status === 'Late') late++;
      }
    });

    const attendanceRate = markedDays > 0 ? Math.round(((present + late) / markedDays) * 100) : 0;
    return { present, absent, late, markedDays, attendanceRate };
  };

  // Calculate Day Stats Helper
  const getDayStats = (dateStr) => {
    const dayData = attendance[dateStr] || {};
    const totalMarked = Object.keys(dayData).length;
    if (totalMarked === 0) return { present: 0, absent: 0, late: 0, total: 0, rate: 0 };
    
    let present = 0;
    let absent = 0;
    let late = 0;

    Object.values(dayData).forEach(status => {
      if (status === 'Present') present++;
      else if (status === 'Absent') absent++;
      else if (status === 'Late') late++;
    });

    // Punctuality/Attendance rate calculation: (Present + Late) / Total
    const rate = Math.round(((present + late) / STUDENTS.length) * 100);
    return { present, absent, late, total: totalMarked, rate };
  };

  // Global Aggregate Stats
  const getGlobalStats = () => {
    const dates = Object.keys(attendance);
    if (dates.length === 0) return { overallRate: 0, totalDays: 0, classAverages: {} };

    let totalPossibleSittings = 0;
    let totalPresentOrLate = 0;
    const classStats = {};

    classesList.filter(c => c !== 'All').forEach(className => {
      classStats[className] = { possible: 0, attended: 0 };
    });

    dates.forEach(date => {
      const dayData = attendance[date];
      STUDENTS.forEach(student => {
        const status = dayData[student.regNo];
        if (status) {
          totalPossibleSittings++;
          if (status === 'Present' || status === 'Late') {
            totalPresentOrLate++;
            if (classStats[student.class]) {
              classStats[student.class].attended++;
            }
          }
          if (classStats[student.class]) {
            classStats[student.class].possible++;
          }
        }
      });
    });

    const overallRate = totalPossibleSittings > 0 ? Math.round((totalPresentOrLate / totalPossibleSittings) * 100) : 0;
    
    const classAverages = {};
    Object.keys(classStats).forEach(c => {
      const data = classStats[c];
      classAverages[c] = data.possible > 0 ? Math.round((data.attended / data.possible) * 100) : 0;
    });

    return {
      overallRate,
      totalDays: dates.length,
      classAverages
    };
  };

  const globalStats = getGlobalStats();
  const activeDayStats = getDayStats(selectedDate);

  // Generate dynamic avatars initials + color based on name length
  const getAvatarDetails = (name, gender) => {
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    // Dynamic HSL colors for aesthetics
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const hue = hash % 360;
    // Girls get slightly cooler colors and boys warmer, or randomized by name
    const background = `hsl(${hue}, 70%, ${gender === 'Female' ? '85%' : '80%'})`;
    const color = `hsl(${hue}, 80%, 25%)`;
    return { initials, background, color };
  };

  // Export Daily Summary Report
  const exportSummary = () => {
    const presentList = [];
    const absentList = [];
    const lateList = [];
    const unmarkedList = [];

    STUDENTS.forEach(s => {
      const st = currentDayRecord[s.regNo];
      if (st === 'Present') presentList.push(`${s.name} (${s.regNo})`);
      else if (st === 'Absent') absentList.push(`${s.name} (${s.regNo})`);
      else if (st === 'Late') lateList.push(`${s.name} (${s.regNo})`);
      else unmarkedList.push(`${s.name} (${s.regNo})`);
    });

    const report = `===========================================
ATTENDANCE REPORT FOR: ${selectedDate}
Overall Attendance: ${activeDayStats.rate}%
Marked Sheet: ${activeDayStats.total} / ${STUDENTS.length} Students
===========================================

PRESENT (${presentList.length}):
${presentList.map(n => '- ' + n).join('\n') || 'None'}

LATE (${lateList.length}):
${lateList.map(n => '- ' + n).join('\n') || 'None'}

ABSENT (${absentList.length}):
${absentList.map(n => '- ' + n).join('\n') || 'None'}

UNMARKED (${unmarkedList.length}):
${unmarkedList.map(n => '- ' + n).join('\n') || 'None'}
===========================================`;

    navigator.clipboard.writeText(report);
    showToast("Report copied to clipboard! You can paste it anywhere.", "success");
  };

  return (
    <div className="app-container">
      {/* Toast Notification */}
      {notification && (
        <div className={`toast-notification toast-${notification.type}`}>
          <div className="toast-icon">
            {notification.type === 'success' && <Icon name="check" />}
            {notification.type === 'warning' && <Icon name="x" />}
            {notification.type === 'info' && <Icon name="info" />}
          </div>
          <span>{notification.message}</span>
        </div>
      )}

      {/* Hero Header Area */}
      <header className="app-header">
        <div className="header-brand">
          <div className="logo-badge">P</div>
          <div>
            <h1>Presence</h1>
            <p className="subtitle">Smart Attendance & Analytics</p>
          </div>
        </div>

        {/* Global Statistics Overview */}
        <div className="header-metrics">
          <div className="metric-pill">
            <span className="pill-label">Overall Attendance</span>
            <span className="pill-value">{globalStats.overallRate}%</span>
          </div>
          <div className="metric-pill">
            <span className="pill-label">Total Logs</span>
            <span className="pill-value">{globalStats.totalDays} Days</span>
          </div>
        </div>
      </header>

      {/* Controls Bar: Tabs and Date Selectors */}
      <div className="controls-nav-bar">
        <nav className="tab-navigation">
          <button 
            className={`tab-btn ${activeTab === 'attendance' ? 'active' : ''}`}
            onClick={() => setActiveTab('attendance')}
          >
            <Icon name="calendar" className="tab-icon" />
            <span>Mark Sheet</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === 'students' ? 'active' : ''}`}
            onClick={() => setActiveTab('students')}
          >
            <Icon name="users" className="tab-icon" />
            <span>Directory</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            <Icon name="chart" className="tab-icon" />
            <span>Analytics</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            <Icon name="history" className="tab-icon" />
            <span>History Logs</span>
          </button>
        </nav>

        {/* Date Selector widget */}
        <div className="date-widget">
          <label htmlFor="date-picker" className="date-label">Working Date</label>
          <div className="date-input-wrapper">
            <input 
              id="date-picker"
              type="date" 
              value={selectedDate} 
              onChange={(e) => setSelectedDate(e.target.value)}
              className="date-input"
            />
            <button 
              className="today-btn"
              onClick={() => setSelectedDate(new Date().toISOString().split('T')[0])}
            >
              Today
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="tab-content">
        
        {/* TAB 1: ATTENDANCE SHEET */}
        {activeTab === 'attendance' && (
          <section className="fade-in">
            <div className="section-header">
              <div>
                <h2>Daily Attendance Sheet</h2>
                <p className="desc">Active records for <strong>{selectedDate}</strong>. Changes save automatically.</p>
              </div>

              {/* Status summary of the day */}
              <div className="day-summary-banner">
                <div className="summary-stat text-present">
                  <span className="sum-num">{activeDayStats.present}</span>
                  <span className="sum-txt">Present</span>
                </div>
                <div className="summary-stat text-late">
                  <span className="sum-num">{activeDayStats.late}</span>
                  <span className="sum-txt">Late</span>
                </div>
                <div className="summary-stat text-absent">
                  <span className="sum-num">{activeDayStats.absent}</span>
                  <span className="sum-txt">Absent</span>
                </div>
                <div className="summary-stat text-neutral">
                  <span className="sum-num">{STUDENTS.length - activeDayStats.total}</span>
                  <span className="sum-txt">Unmarked</span>
                </div>
                <div className="summary-gauge">
                  <div className="gauge-fill" style={{ width: `${activeDayStats.rate}%` }}></div>
                  <span className="gauge-label">{activeDayStats.rate}% Attended</span>
                </div>
              </div>
            </div>

            {/* Filter and Bulk tools */}
            <div className="filter-tools-row">
              <div className="search-box">
                <Icon name="search" className="search-icon" />
                <input 
                  type="text" 
                  placeholder="Search name or register number..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input-field"
                />
              </div>

              <div className="filter-dropdown-wrapper">
                <select 
                  value={selectedClass} 
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="class-select"
                >
                  {classesList.map(c => <option key={c} value={c}>{c === 'All' ? 'All Classes' : c}</option>)}
                </select>
              </div>

              <div className="bulk-actions-group">
                <button className="bulk-btn btn-success-light" onClick={() => handleMarkAll('Present')}>
                  <Icon name="check" className="btn-small-icon" /> Mark Present
                </button>
                <button className="bulk-btn btn-danger-light" onClick={() => handleMarkAll('Absent')}>
                  <Icon name="x" className="btn-small-icon" /> Mark Absent
                </button>
                <button className="bulk-btn btn-secondary-light" onClick={exportSummary} title="Copy attendance report">
                  <Icon name="download" className="btn-small-icon" /> Copy Report
                </button>
                <button className="bulk-btn btn-danger-text" onClick={handleClearAll} title="Reset attendance sheet">
                  Clear Sheet
                </button>
              </div>
            </div>

            {/* Attendance Grid */}
            <div className="attendance-grid">
              {filteredStudents.length > 0 ? (
                filteredStudents.map(student => {
                  const status = currentDayRecord[student.regNo];
                  const { initials, background, color } = getAvatarDetails(student.name, student.gender);
                  
                  return (
                    <div key={student.regNo} className={`attendance-row-card ${status ? 'status-marked-' + status.toLowerCase() : ''}`}>
                      <div className="student-info-section" onClick={() => setSelectedStudent(student)}>
                        <div className="student-avatar" style={{ background, color }}>
                          {initials}
                        </div>
                        <div className="student-texts">
                          <span className="student-name-text">{student.name}</span>
                          <div className="student-meta-subtext">
                            <span className="tag-class">{student.class}</span>
                            <span className="divider">•</span>
                            <span className="text-reg">{student.regNo}</span>
                            <span className="divider">•</span>
                            <span className="text-roll">Roll #{student.rollNo}</span>
                          </div>
                        </div>
                      </div>

                      {/* Control buttons */}
                      <div className="attendance-controls">
                        <button 
                          className={`control-btn present-btn ${status === 'Present' ? 'active' : ''}`}
                          onClick={() => handleMarkStatus(student.regNo, 'Present')}
                          title="Mark Present"
                        >
                          <Icon name="check" className="control-icon" />
                          <span>Present</span>
                        </button>
                        
                        <button 
                          className={`control-btn late-btn ${status === 'Late' ? 'active' : ''}`}
                          onClick={() => handleMarkStatus(student.regNo, 'Late')}
                          title="Mark Late (Punctuality Alert)"
                        >
                          <Icon name="clock" className="control-icon" />
                          <span>Late</span>
                        </button>

                        <button 
                          className={`control-btn absent-btn ${status === 'Absent' ? 'active' : ''}`}
                          onClick={() => handleMarkStatus(student.regNo, 'Absent')}
                          title="Mark Absent"
                        >
                          <Icon name="x" className="control-icon" />
                          <span>Absent</span>
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="empty-results-card">
                  <h3>No students match your active filters</h3>
                  <p>Try resetting the search terms or class selection dropdown above.</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* TAB 2: STUDENT DIRECTORY */}
        {activeTab === 'students' && (
          <section className="fade-in">
            <div className="section-header">
              <div>
                <h2>Student Directory</h2>
                <p className="desc">Complete list of registered students. Click a student card to open deep attendance profiles.</p>
              </div>
            </div>

            {/* Filter Toolbar */}
            <div className="filter-tools-row">
              <div className="search-box">
                <Icon name="search" className="search-icon" />
                <input 
                  type="text" 
                  placeholder="Search students..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input-field"
                />
              </div>

              <div className="filter-dropdown-wrapper">
                <select 
                  value={selectedClass} 
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="class-select"
                >
                  {classesList.map(c => <option key={c} value={c}>{c === 'All' ? 'All Classes' : c}</option>)}
                </select>
              </div>
            </div>

            {/* Directory Cards */}
            <div className="directory-grid">
              {filteredStudents.map(student => {
                const stats = calculateStudentStats(student.regNo);
                const { initials, background, color } = getAvatarDetails(student.name, student.gender);
                
                // Color scale for attendance health indicators
                let healthClass = 'health-good';
                if (stats.attendanceRate < 75) healthClass = 'health-critical';
                else if (stats.attendanceRate < 90) healthClass = 'health-warning';

                return (
                  <div key={student.regNo} className="directory-card" onClick={() => setSelectedStudent(student)}>
                    <div className="directory-card-top">
                      <div className="student-avatar large" style={{ background, color }}>
                        {initials}
                      </div>
                      <span className="tag-class">{student.class}</span>
                    </div>

                    <div className="directory-card-body">
                      <h3>{student.name}</h3>
                      <p className="reg-id">{student.regNo}</p>
                      <p className="email-link">
                        <Icon name="mail" className="small-icon" /> {student.email}
                      </p>
                    </div>

                    <div className="directory-card-footer">
                      <div className="rate-indicator">
                        <span className="lbl">Attendance Rate</span>
                        <div className="value-row">
                          <span className={`val ${healthClass}`}>{stats.attendanceRate}%</span>
                          <span className="sub">({stats.markedDays} logs)</span>
                        </div>
                      </div>
                      
                      <div className="mini-bar">
                        <div className="mini-fill fill-present" style={{ width: `${stats.markedDays > 0 ? (stats.present / stats.markedDays) * 100 : 0}%` }}></div>
                        <div className="mini-fill fill-late" style={{ width: `${stats.markedDays > 0 ? (stats.late / stats.markedDays) * 100 : 0}%` }}></div>
                        <div className="mini-fill fill-absent" style={{ width: `${stats.markedDays > 0 ? (stats.absent / stats.markedDays) * 100 : 0}%` }}></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* TAB 3: INSIGHTS & ANALYTICS */}
        {activeTab === 'analytics' && (
          <section className="fade-in">
            <div className="section-header">
              <div>
                <h2>Performance Analytics</h2>
                <p className="desc">Historical statistical breakdown across all classes and dates logged.</p>
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="analytics-overview-grid">
              <div className="metric-card glass">
                <div className="metric-header">
                  <h3>Overall Class Attendance</h3>
                  <Icon name="award" className="text-accent" />
                </div>
                <div className="metric-body">
                  <span className="big-stat">{globalStats.overallRate}%</span>
                  <p className="subtext">Weighted cumulative attendance rate</p>
                </div>
                <div className="metric-bar">
                  <div className="metric-fill-bg" style={{ width: `${globalStats.overallRate}%` }}></div>
                </div>
              </div>

              <div className="metric-card glass">
                <div className="metric-header">
                  <h3>Active Days Logged</h3>
                  <Icon name="calendar" className="text-accent" />
                </div>
                <div className="metric-body">
                  <span className="big-stat">{globalStats.totalDays}</span>
                  <p className="subtext">Logs saved in localStorage database</p>
                </div>
              </div>

              <div className="metric-card glass">
                <div className="metric-header">
                  <h3>Total Enrolled</h3>
                  <Icon name="users" className="text-accent" />
                </div>
                <div className="metric-body">
                  <span className="big-stat">{STUDENTS.length}</span>
                  <p className="subtext">Across {classesList.filter(c => c !== 'All').length} distinct branches</p>
                </div>
              </div>
            </div>

            {/* Comparative Breakdown and Details */}
            <div className="analytics-details-row">
              {/* Class Performance Comparison */}
              <div className="detail-panel glass">
                <h3>Attendance By Class</h3>
                <p className="panel-desc">Class performance averages calculated across all dates.</p>
                <div className="chart-list">
                  {Object.keys(globalStats.classAverages).map(className => {
                    const avg = globalStats.classAverages[className];
                    let barColor = 'var(--present)';
                    if (avg < 75) barColor = 'var(--absent)';
                    else if (avg < 90) barColor = 'var(--late)';

                    return (
                      <div key={className} className="chart-item">
                        <div className="chart-item-header">
                          <span className="class-name">{className}</span>
                          <span className="class-avg font-bold">{avg}%</span>
                        </div>
                        <div className="progress-track">
                          <div className="progress-bar-fill" style={{ width: `${avg}%`, background: barColor }}></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Status Ratios */}
              <div className="detail-panel glass">
                <h3>Global Distribution</h3>
                <p className="panel-desc">Breakdown of Present vs Absent vs Late designations across all time.</p>
                
                {(() => {
                  let totalPresent = 0;
                  let totalAbsent = 0;
                  let totalLate = 0;
                  let totalRecords = 0;

                  Object.values(attendance).forEach(day => {
                    Object.values(day).forEach(status => {
                      totalRecords++;
                      if (status === 'Present') totalPresent++;
                      else if (status === 'Absent') totalAbsent++;
                      else if (status === 'Late') totalLate++;
                    });
                  });

                  if (totalRecords === 0) return <p className="no-data">No records available</p>;

                  const pPct = Math.round((totalPresent / totalRecords) * 100);
                  const aPct = Math.round((totalAbsent / totalRecords) * 100);
                  const lPct = Math.round((totalLate / totalRecords) * 100);

                  return (
                    <div className="ratio-container">
                      <div className="distribution-ratio-bar">
                        <div className="ratio-seg fill-present" style={{ width: `${pPct}%` }} title={`Present: ${pPct}%`}></div>
                        <div className="ratio-seg fill-late" style={{ width: `${lPct}%` }} title={`Late: ${lPct}%`}></div>
                        <div className="ratio-seg fill-absent" style={{ width: `${aPct}%` }} title={`Absent: ${aPct}%`}></div>
                      </div>

                      <div className="ratio-legend">
                        <div className="legend-item">
                          <span className="dot bg-present"></span>
                          <span>Present ({totalPresent} logs • {pPct}%)</span>
                        </div>
                        <div className="legend-item">
                          <span className="dot bg-late"></span>
                          <span>Late ({totalLate} logs • {lPct}%)</span>
                        </div>
                        <div className="legend-item">
                          <span className="dot bg-absent"></span>
                          <span>Absent ({totalAbsent} logs • {aPct}%)</span>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </section>
        )}

        {/* TAB 4: HISTORY */}
        {activeTab === 'history' && (
          <section className="fade-in">
            <div className="section-header">
              <div>
                <h2>Attendance Logs History</h2>
                <p className="desc">List of all dates recorded. Select a date to inspect or edit records.</p>
              </div>
            </div>

            <div className="history-table-wrapper glass">
              <table className="history-table">
                <thead>
                  <tr>
                    <th>Log Date</th>
                    <th>Students Logged</th>
                    <th>Present</th>
                    <th>Late</th>
                    <th>Absent</th>
                    <th>Rate</th>
                    <th className="actions-header">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(attendance).length > 0 ? (
                    Object.keys(attendance)
                      .sort((a, b) => new Date(b) - new Date(a)) // Latest first
                      .map(dateStr => {
                        const dayStats = getDayStats(dateStr);
                        let healthClass = 'health-good';
                        if (dayStats.rate < 75) healthClass = 'health-critical';
                        else if (dayStats.rate < 90) healthClass = 'health-warning';

                        return (
                          <tr key={dateStr}>
                            <td className="font-bold">{dateStr}</td>
                            <td>{dayStats.total} / {STUDENTS.length}</td>
                            <td className="text-present">{dayStats.present}</td>
                            <td className="text-late">{dayStats.late}</td>
                            <td className="text-absent">{dayStats.absent}</td>
                            <td className={`font-bold ${healthClass}`}>{dayStats.rate}%</td>
                            <td className="table-actions">
                              <button 
                                className="action-link-btn" 
                                onClick={() => {
                                  setSelectedDate(dateStr);
                                  setActiveTab('attendance');
                                }}
                              >
                                Edit Sheet
                              </button>
                            </td>
                          </tr>
                        );
                      })
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center py-8 text-muted">
                        No attendance history found in storage. Start by marking attendance!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>

      {/* STUDENT PROFILE MODAL/DRAWER */}
      {selectedStudent && (
        <div className="modal-backdrop" onClick={() => setSelectedStudent(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={() => setSelectedStudent(null)}>
              <Icon name="x" />
            </button>
            
            {(() => {
              const student = selectedStudent;
              const stats = calculateStudentStats(student.regNo);
              const { initials, background, color } = getAvatarDetails(student.name, student.gender);
              
              let healthClass = 'health-good';
              if (stats.attendanceRate < 75) healthClass = 'health-critical';
              else if (stats.attendanceRate < 90) healthClass = 'health-warning';

              return (
                <div className="student-profile-details">
                  {/* Top Profile Header */}
                  <div className="profile-hero">
                    <div className="student-avatar profile-avatar" style={{ background, color }}>
                      {initials}
                    </div>
                    <div className="profile-title-block">
                      <h2>{student.name}</h2>
                      <span className="profile-reg">{student.regNo}</span>
                      <div className="profile-tags">
                        <span className="tag-class">{student.class}</span>
                        <span className="tag-roll">Roll Number: {student.rollNo}</span>
                      </div>
                    </div>
                  </div>

                  {/* Profile Stats Cards */}
                  <div className="profile-stats-cards">
                    <div className="profile-stat-card bg-accent-light">
                      <span className="card-lbl">Attendance Rate</span>
                      <span className={`card-val ${healthClass}`}>{stats.attendanceRate}%</span>
                      <span className="card-sub">{stats.markedDays} logs recorded</span>
                    </div>

                    <div className="profile-stat-card text-present">
                      <span className="card-lbl">Present Days</span>
                      <span className="card-val">{stats.present}</span>
                      <span className="card-sub">Days on time</span>
                    </div>

                    <div className="profile-stat-card text-late">
                      <span className="card-lbl">Late Days</span>
                      <span className="card-val">{stats.late}</span>
                      <span className="card-sub">Punctuality alert</span>
                    </div>

                    <div className="profile-stat-card text-absent">
                      <span className="card-lbl">Absent Days</span>
                      <span className="card-val">{stats.absent}</span>
                      <span className="card-sub">Excused or Unexcused</span>
                    </div>
                  </div>

                  {/* Calendar / Timeline Records */}
                  <div className="profile-history-section">
                    <h3>Personal Log Calendar</h3>
                    <p className="section-subtitle">Chronological record of status history.</p>
                    
                    <div className="calendar-grid-timeline">
                      {Object.keys(attendance)
                        .sort((a, b) => new Date(b) - new Date(a))
                        .map(dateStr => {
                          const status = attendance[dateStr][student.regNo];
                          if (!status) return null;

                          return (
                            <div key={dateStr} className={`timeline-badge status-badge-${status.toLowerCase()}`}>
                              <span className="timeline-date">{dateStr}</span>
                              <div className="timeline-status-row">
                                <span className="status-dot"></span>
                                <span className="status-txt">{status}</span>
                              </div>
                            </div>
                          );
                        })}
                      {stats.markedDays === 0 && (
                        <p className="no-data">No attendance records have been registered for this student yet.</p>
                      )}
                    </div>
                  </div>

                  {/* Action row */}
                  <div className="profile-footer-actions">
                    <a href={`mailto:${student.email}`} className="email-action-btn">
                      <Icon name="mail" className="btn-small-icon" /> Send Email Notification ({student.email})
                    </a>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* App Footer */}
      <footer className="app-footer">
        <p>© 2026 Presence Attendance Management. All rights reserved.</p>
        <p className="tech">Powered by React, CSS Variables, and LocalStorage.</p>
      </footer>
    </div>
  );
}

export default App;
