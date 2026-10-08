import { useEffect, useMemo, useState } from 'react'
import './App.css'

const sampleStudents = [
  { id: 1, studentNumber: 'STU-2025-001', firstName: 'Aarav', lastName: 'Sharma', email: 'aarav.sharma@northstar.edu', department: 'Computer Science', year: 3, status: 'Active', phone: '+91 98765 43210', enrolledDate: '2023-08-14' },
  { id: 2, studentNumber: 'STU-2025-002', firstName: 'Maya', lastName: 'Patel', email: 'maya.patel@northstar.edu', department: 'Business', year: 2, status: 'Active', phone: '+91 98765 43211', enrolledDate: '2024-08-12' },
  { id: 3, studentNumber: 'STU-2025-003', firstName: 'Ishaan', lastName: 'Gupta', email: 'ishaan.gupta@northstar.edu', department: 'Engineering', year: 4, status: 'Active', phone: '+91 98765 43212', enrolledDate: '2022-08-15' },
  { id: 4, studentNumber: 'STU-2025-004', firstName: 'Ananya', lastName: 'Reddy', email: 'ananya.reddy@northstar.edu', department: 'Design', year: 1, status: 'On leave', phone: '+91 98765 43213', enrolledDate: '2025-08-11' },
  { id: 5, studentNumber: 'STU-2025-005', firstName: 'Kabir', lastName: 'Mehta', email: 'kabir.mehta@northstar.edu', department: 'Computer Science', year: 2, status: 'Active', phone: '+91 98765 43214', enrolledDate: '2024-08-12' },
  { id: 6, studentNumber: 'STU-2025-006', firstName: 'Diya', lastName: 'Nair', email: 'diya.nair@northstar.edu', department: 'Business', year: 3, status: 'Active', phone: '+91 98765 43215', enrolledDate: '2023-08-14' },
]

const navItems = [
  { label: 'Overview', icon: 'grid' },
  { label: 'Students', icon: 'users' },
  { label: 'Departments', icon: 'building' },
  { label: 'Courses', icon: 'book' },
  { label: 'Faculty', icon: 'faculty' },
  { label: 'Enrollment', icon: 'enrollment' },
  { label: 'Fees', icon: 'fees' },
  { label: 'Library', icon: 'library' },
]

const portalData = {
  Departments: [
    { code: 'CSE', title: 'Computer Science', subtitle: 'School of Computing', detail: 'Dr. Meera Iyer', count: '1,240 students', extra: '18 programs' },
    { code: 'ENG', title: 'Engineering', subtitle: 'School of Engineering', detail: 'Dr. Vikram Rao', count: '980 students', extra: '12 programs' },
    { code: 'BUS', title: 'Business', subtitle: 'School of Business', detail: 'Prof. Anjali Shah', count: '760 students', extra: '9 programs' },
    { code: 'DSN', title: 'Design', subtitle: 'School of Design', detail: 'Prof. Neha Kapoor', count: '420 students', extra: '6 programs' },
    { code: 'SCI', title: 'Sciences', subtitle: 'School of Sciences', detail: 'Dr. Arjun Menon', count: '690 students', extra: '11 programs' },
  ],
  Courses: [
    { code: 'CS301', title: 'Data Structures & Algorithms', subtitle: 'Computer Science · 4 credits', detail: 'Dr. Meera Iyer', count: 'Tue / Thu · 10:30 AM', extra: '24 / 40 seats' },
    { code: 'CS315', title: 'Database Management Systems', subtitle: 'Computer Science · 3 credits', detail: 'Prof. Karan Desai', count: 'Mon / Wed · 1:00 PM', extra: '18 / 35 seats' },
    { code: 'MA204', title: 'Applied Statistics', subtitle: 'Sciences · 3 credits', detail: 'Dr. Ritu Bose', count: 'Tue / Fri · 9:00 AM', extra: '31 / 40 seats' },
    { code: 'EC210', title: 'Principles of Economics', subtitle: 'Business · 3 credits', detail: 'Prof. Anjali Shah', count: 'Mon / Thu · 2:00 PM', extra: '22 / 45 seats' },
    { code: 'EN220', title: 'Sustainable Systems', subtitle: 'Engineering · 4 credits', detail: 'Dr. Vikram Rao', count: 'Wed / Fri · 11:30 AM', extra: '16 / 30 seats' },
  ],
  Faculty: [
    { code: 'MI', title: 'Dr. Meera Iyer', subtitle: 'Computer Science · Professor', detail: 'Data Science, Algorithms', count: 'meera.iyer@northstar.edu', extra: 'Office 3B · North Hall' },
    { code: 'VR', title: 'Dr. Vikram Rao', subtitle: 'Engineering · Associate Professor', detail: 'Systems Engineering', count: 'vikram.rao@northstar.edu', extra: 'Office 214 · Engineering' },
    { code: 'AS', title: 'Prof. Anjali Shah', subtitle: 'Business · Professor', detail: 'Economics, Finance', count: 'anjali.shah@northstar.edu', extra: 'Office 108 · Business' },
    { code: 'NK', title: 'Prof. Neha Kapoor', subtitle: 'Design · Department Chair', detail: 'Product Design, UX', count: 'neha.kapoor@northstar.edu', extra: 'Studio 12 · Arts Block' },
  ],
  Library: [
    { code: '005.1', title: 'Introduction to Algorithms', subtitle: 'Thomas H. Cormen · 4th edition', detail: 'Computer Science', count: 'Central library · Shelf A-12', extra: 'Due Oct 18' },
    { code: '005.74', title: 'Database System Concepts', subtitle: 'Silberschatz, Korth & Sudarshan', detail: 'Computer Science', count: 'Central library · Shelf B-04', extra: 'Available' },
    { code: '330.1', title: 'Principles of Economics', subtitle: 'N. Gregory Mankiw · 9th edition', detail: 'Business', count: 'Business library · Shelf C-09', extra: 'Available' },
    { code: '519.5', title: 'Introduction to Probability', subtitle: 'Dimitri P. Bertsekas', detail: 'Sciences', count: 'Central library · Shelf D-07', extra: 'Available' },
  ],
}

const initialFees = [
  { id: 'INV-2026-0142', title: 'Fall semester tuition', date: '2026-10-15', amount: 54000, status: 'Due' },
  { id: 'INV-2026-0118', title: 'Laboratory and facilities', date: '2026-09-28', amount: 8500, status: 'Paid' },
  { id: 'INV-2026-0105', title: 'Library deposit', date: '2026-09-12', amount: 2000, status: 'Paid' },
  { id: 'INV-2026-0149', title: 'Examination fee', date: '2026-10-22', amount: 3200, status: 'Due' },
]

const initialEnrollments = {
  CS301: true,
  CS315: false,
  MA204: true,
  EC210: false,
  EN220: false,
}

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  department: 'Computer Science',
  year: '1',
  phone: '',
  status: 'Active',
}

const currentYear = new Date().getFullYear()
const currentDateLabel = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  year: 'numeric',
}).format(new Date()).toUpperCase()

function pageFromPath(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/'
  return navItems.find((item) => item.path === path)?.label
    ?? navItems.find((item) => `/${item.label.toLowerCase()}` === path)?.label
    ?? 'Overview'
}

function Icon({ name, size = 18 }) {
  const paths = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="10" cy="7" r="4" /><path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    arrow: <><path d="M7 17 17 7M7 7h10v10" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 11h18" /></>,
    book: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    more: <><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></>,
    close: <><path d="m18 6-12 12M6 6l12 12" /></>,
    edit: <><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4Z" /></>,
    trash: <><path d="M3 6h18M8 6V4h8v2m3 0-1 14H6L5 6m4 4v7m6-7v7" /></>,
    chevron: <path d="m9 18 6-6-6-6" />,
    menu: <><path d="M4 6h16M4 12h16M4 18h16" /></>,
    building: <><path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4" /><path d="M9 9v.01M9 12v.01M9 15v.01M9 18v.01M15 12v.01M15 15v.01M15 18v.01" /></>,
    faculty: <><circle cx="9" cy="8" r="4" /><path d="M3 21v-2a6 6 0 0 1 12 0v2M19 8v6m3-3h-6" /></>,
    enrollment: <><path d="M4 4h16v16H4zM8 9h8M8 13h8M8 17h4" /><path d="m16 4 2 2 3-3" /></>,
    fees: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18M7 15h3" /></>,
    library: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" /><path d="M9 7h7" /></>,
  }

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  )
}

function initials(student) {
  return `${student.firstName?.[0] ?? ''}${student.lastName?.[0] ?? ''}`.toUpperCase()
}

function formatDate(date) {
  if (!date) return '—'
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(`${date}T00:00:00`))
}

function App() {
  const [students, setStudents] = useState(sampleStudents)
  const [activePage, setActivePage] = useState(() => pageFromPath(window.location.pathname))
  const [feeRecords, setFeeRecords] = useState(initialFees)
  const [enrolledCourses, setEnrolledCourses] = useState(initialEnrollments)
  const [borrowedBooks, setBorrowedBooks] = useState({ '005.1': true })
  const [search, setSearch] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('All departments')
  const [isConnected, setIsConnected] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingStudent, setEditingStudent] = useState(null)
  const [form, setForm] = useState(initialForm)
  const [formError, setFormError] = useState('')
  const [notice, setNotice] = useState('')
  const [loading, setLoading] = useState(true)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    fetch('/api/students', { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Server returned ${response.status}`)
        return response.json()
      })
      .then((data) => {
        setStudents(data)
        setIsConnected(true)
      })
      .catch(() => {
        if (!controller.signal.aborted) setIsConnected(false)
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })
    return () => controller.abort()
  }, [])

  useEffect(() => {
    function syncPageWithUrl() {
      setActivePage(pageFromPath(window.location.pathname))
    }

    window.addEventListener('popstate', syncPageWithUrl)
    return () => window.removeEventListener('popstate', syncPageWithUrl)
  }, [])

  useEffect(() => {
    if (!notice) return undefined
    const timeout = window.setTimeout(() => setNotice(''), 3200)
    return () => window.clearTimeout(timeout)
  }, [notice])

  const filteredStudents = useMemo(() => {
    const query = search.trim().toLowerCase()
    return students.filter((student) => {
      const matchesDepartment = departmentFilter === 'All departments' || student.department === departmentFilter
      const matchesSearch = !query || [
        student.firstName,
        student.lastName,
        student.email,
        student.studentNumber,
        student.department,
      ].some((value) => value?.toLowerCase().includes(query))
      return matchesDepartment && matchesSearch
    })
  }, [departmentFilter, search, students])

  const activeCount = students.filter((student) => student.status === 'Active').length
  const departmentCount = new Set(students.map((student) => student.department)).size
  const departments = ['All departments', ...new Set(students.map((student) => student.department))]

  function navigateToPage(page) {
    const path = page === 'Overview' ? '/' : `/${page.toLowerCase()}`
    if (window.location.pathname !== path) window.history.pushState({}, '', path)
    setActivePage(page)
    setMobileNavOpen(false)
  }

  function handlePortalAction(action, item) {
    if (action === 'pay') {
      setFeeRecords((current) => current.map((fee) => fee.id === item.id ? { ...fee, status: 'Paid' } : fee))
      setNotice(`Demo payment recorded for ${item.title}. No real money was charged.`)
    } else if (action === 'enroll') {
      setEnrolledCourses((current) => ({ ...current, [item.code]: !current[item.code] }))
      setNotice(`${enrolledCourses[item.code] ? 'Dropped' : 'Enrolled in'} ${item.title}.`)
    } else if (action === 'borrow') {
      setBorrowedBooks((current) => ({ ...current, [item.code]: !current[item.code] }))
      setNotice(`${borrowedBooks[item.code] ? 'Returned' : 'Borrowed'} ${item.title}.`)
    } else if (action === 'new-enrollment') {
      navigateToPage('Enrollment')
    } else {
      navigateToPage(action)
    }
  }

  function openCreateModal() {
    setEditingStudent(null)
    setForm(initialForm)
    setFormError('')
    setModalOpen(true)
  }

  function openEditModal(student) {
    setEditingStudent(student)
    setForm({
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      department: student.department,
      year: String(student.year),
      phone: student.phone ?? '',
      status: student.status,
    })
    setFormError('')
    setModalOpen(true)
  }

  async function saveStudent(event) {
    event.preventDefault()
    setFormError('')
    const method = editingStudent ? 'PUT' : 'POST'
    const url = editingStudent ? `/api/students/${editingStudent.id}` : '/api/students'
    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, year: Number(form.year) }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.message ?? 'Unable to save student.')
      if (editingStudent) {
        setStudents((current) => current.map((student) => student.id === result.id ? result : student))
        setNotice('Student details updated.')
      } else {
        setStudents((current) => [result, ...current])
        setNotice('Student added successfully.')
      }
      setModalOpen(false)
    } catch (error) {
      setFormError(isConnected ? error.message : 'Connect to the Spring Boot API to save changes.')
    }
  }

  async function deleteStudent(student) {
    if (!window.confirm(`Remove ${student.firstName} ${student.lastName} from the directory?`)) return
    try {
      const response = await fetch(`/api/students/${student.id}`, { method: 'DELETE' })
      if (!response.ok) {
        const result = await response.json()
        throw new Error(result.message ?? 'Unable to remove student.')
      }
      setStudents((current) => current.filter((item) => item.id !== student.id))
      setNotice('Student removed from the directory.')
    } catch (error) {
      setNotice(error.message || 'Could not connect to the student API.')
    }
  }

  const isStudentsPage = activePage === 'Students'
  const isOverviewPage = activePage === 'Overview'
  const routeForPage = (page) => page === 'Overview' ? '/' : `/${page.toLowerCase()}`

  return (
    <div className="app-shell">
      {mobileNavOpen && <button className="mobile-backdrop" aria-label="Close navigation" onClick={() => setMobileNavOpen(false)} />}
      <aside className={`sidebar ${mobileNavOpen ? 'sidebar--open' : ''}`}>
        <a className="brand" href="/" onClick={(event) => { event.preventDefault(); navigateToPage('Overview') }}>
          <span className="brand-mark"><span>n</span></span>
          <span className="brand-name">northstar<span>.</span></span>
        </a>
        <div className="campus-switcher">
          <div className="campus-avatar">NU</div>
          <div className="campus-copy"><strong>Northstar University</strong><span>Main campus</span></div>
          <span className="campus-caret">⌄</span>
        </div>
        <p className="nav-label">CAMPUS</p>
        <nav className="main-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <a key={item.label} href={routeForPage(item.label)} aria-current={activePage === item.label ? 'page' : undefined} className={`nav-item ${activePage === item.label ? 'nav-item--active' : ''}`} onClick={(event) => { event.preventDefault(); navigateToPage(item.label) }}>
              <Icon name={item.icon} size={18} /><span>{item.label}</span>
              {item.label === 'Students' && <span className="nav-count">{students.length}</span>}
            </a>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="help-card">
            <div className="help-icon"><Icon name="book" size={16} /></div>
            <strong>Need a hand?</strong>
            <p>Visit the admin guide to learn your way around.</p>
            <a href="#help" onClick={(event) => event.preventDefault()}>Open help center <Icon name="arrow" size={13} /></a>
          </div>
          <button className="profile-button">
            <div className="profile-avatar">AM</div>
            <div className="profile-copy"><strong>Alex Morgan</strong><span>Administrator</span></div>
            <Icon name="more" size={18} />
          </button>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <button className="mobile-menu" aria-label="Open navigation" onClick={() => setMobileNavOpen(true)}><Icon name="menu" /></button>
          <div className="breadcrumb"><span>Campus</span><Icon name="chevron" size={14} /><strong>{activePage}</strong></div>
          <div className="topbar-actions">
            <span className="semester-pill"><span className="semester-dot" /> Fall semester {currentYear}</span>
            <button className="icon-button notification-button" aria-label="Notifications"><Icon name="bell" size={18} /><span /></button>
            <div className="topbar-divider" />
            <div className="topbar-user"><span className="topbar-avatar">AM</span><span>Alex Morgan</span><span className="user-chevron">⌄</span></div>
          </div>
        </header>

        <div className="page-content">
          {!isConnected && !loading && <div className="connection-banner"><span className="connection-dot" /> Preview mode — student records and campus services use sample data. Start the Spring Boot API to connect live student records.</div>}
          {loading && <div className="connection-banner connection-banner--loading"><span className="connection-dot" /> Connecting to student services…</div>}
          {isStudentsPage ? (
            <>
              <section className="page-heading page-heading--students">
                <div>
                  <div className="eyebrow">PEOPLE &amp; RECORDS</div>
                  <h1>Student directory</h1>
                  <p>Manage student records, enrollment details, and academic status.</p>
                </div>
                <button className="primary-button" type="button" onClick={openCreateModal} disabled={!isConnected}><Icon name="plus" size={17} /> Add student</button>
              </section>
              <section className="directory-card">
                <div className="directory-toolbar">
                  <div className="directory-title"><h2>All students</h2><span>{filteredStudents.length} records</span></div>
                  <div className="table-controls">
                    <label className="search-box"><Icon name="search" size={17} /><input aria-label="Search students" placeholder="Search students..." value={search} onChange={(event) => setSearch(event.target.value)} /><kbd>⌘ K</kbd></label>
                    <select aria-label="Filter by department" className="filter-select" value={departmentFilter} onChange={(event) => setDepartmentFilter(event.target.value)}>
                      {departments.map((department) => <option key={department}>{department}</option>)}
                    </select>
                  </div>
                </div>
                <StudentTable students={filteredStudents} onEdit={openEditModal} onDelete={deleteStudent} disabled={!isConnected} />
                <div className="table-footer"><span>Showing <strong>{filteredStudents.length ? 1 : 0}–{filteredStudents.length}</strong> of <strong>{filteredStudents.length}</strong> students</span><div className="pagination"><button disabled aria-label="Previous page">‹</button><button className="pagination-current">1</button><button disabled aria-label="Next page">›</button></div></div>
              </section>
            </>
          ) : isOverviewPage ? (
            <Dashboard students={students} activeCount={activeCount} departmentCount={departmentCount} onViewStudents={() => navigateToPage('Students')} onViewPage={navigateToPage} />
          ) : (
            <PortalModulePage
              page={activePage}
              feeRecords={feeRecords}
              enrolledCourses={enrolledCourses}
              borrowedBooks={borrowedBooks}
              onAction={handlePortalAction}
            />
          )}
        </div>
      </main>

      {modalOpen && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setModalOpen(false) }}>
          <section className="student-modal" role="dialog" aria-modal="true" aria-labelledby="student-modal-title">
            <div className="modal-heading"><div><span className="eyebrow">{editingStudent ? 'STUDENT RECORD' : 'NEW ENROLLMENT'}</span><h2 id="student-modal-title">{editingStudent ? 'Edit student' : 'Add a student'}</h2><p>Enter the student's details below.</p></div><button className="icon-button" aria-label="Close" onClick={() => setModalOpen(false)}><Icon name="close" /></button></div>
            <form onSubmit={saveStudent}>
              <div className="form-grid">
                <label>First name<input required maxLength="60" value={form.firstName} onChange={(event) => setForm({ ...form, firstName: event.target.value })} /></label>
                <label>Last name<input required maxLength="60" value={form.lastName} onChange={(event) => setForm({ ...form, lastName: event.target.value })} /></label>
                <label className="form-wide">Email address<input required type="email" maxLength="120" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></label>
                <label>Department<select value={form.department} onChange={(event) => setForm({ ...form, department: event.target.value })}>{['Computer Science', 'Engineering', 'Business', 'Design', 'Arts & Humanities', 'Science'].map((department) => <option key={department}>{department}</option>)}</select></label>
                <label>Year of study<select value={form.year} onChange={(event) => setForm({ ...form, year: event.target.value })}>{[1, 2, 3, 4].map((year) => <option key={year} value={year}>Year {year}</option>)}</select></label>
                <label>Phone number<input type="tel" maxLength="24" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} /></label>
                <label>Status<select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })}><option>Active</option><option>On leave</option><option>Graduated</option></select></label>
              </div>
              {formError && <p className="form-error" role="alert">{formError}</p>}
              <div className="modal-actions"><button type="button" className="secondary-button" onClick={() => setModalOpen(false)}>Cancel</button><button type="submit" className="primary-button">{editingStudent ? 'Save changes' : 'Add student'}</button></div>
            </form>
          </section>
        </div>
      )}
      {notice && <div className="toast" role="status">{notice}</div>}
    </div>
  )
}

function StudentTable({ students, onEdit, onDelete, disabled }) {
  return (
    <div className="table-scroll">
      <table className="students-table">
        <thead><tr><th>STUDENT</th><th>STUDENT ID</th><th>DEPARTMENT</th><th>YEAR</th><th>STATUS</th><th>ENROLLED</th><th aria-label="Actions" /></tr></thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.id ?? student.studentNumber}>
              <td><div className="student-person"><div className={`student-avatar avatar-${index % 6}`}>{initials(student)}</div><div><strong>{student.firstName} {student.lastName}</strong><span>{student.email}</span></div></div></td>
              <td className="student-id">{student.studentNumber}</td>
              <td>{student.department}</td>
              <td>Year {student.year}</td>
              <td><span className={`status-pill ${student.status === 'Active' ? 'status-active' : student.status === 'On leave' ? 'status-leave' : 'status-graduated'}`}><i />{student.status}</span></td>
              <td className="date-cell">{formatDate(student.enrolledDate)}</td>
              <td><div className="row-actions"><button aria-label={`Edit ${student.firstName}`} disabled={disabled} onClick={() => onEdit(student)}><Icon name="edit" size={15} /></button><button aria-label={`Delete ${student.firstName}`} disabled={disabled} onClick={() => onDelete(student)}><Icon name="trash" size={15} /></button></div></td>
            </tr>
          ))}
          {!students.length && <tr><td className="empty-state" colSpan="7"><span>No students found</span><p>Try changing your search or department filter.</p></td></tr>}
        </tbody>
      </table>
    </div>
  )
}

function PortalModulePage({ page, feeRecords, enrolledCourses, borrowedBooks, onAction }) {
  const [search, setSearch] = useState('')
  const metadata = {
    Departments: ['ACADEMIC ORGANIZATION', 'Departments', 'Explore schools, programs, and department contacts.'],
    Courses: ['ACADEMIC PLANNING', 'Course catalog', 'Browse courses, faculty, schedules, and available seats.'],
    Faculty: ['CAMPUS DIRECTORY', 'Faculty directory', 'Find faculty members and contact their departments.'],
    Enrollment: ['MY ACADEMICS', 'Course enrollment', 'Review your schedule and manage semester course selections.'],
    Fees: ['STUDENT ACCOUNT', 'Fees & payments', 'Review semester charges, due dates, and payment status.'],
    Library: ['CAMPUS LIBRARY', 'Library services', 'Discover the catalog and manage your current loans.'],
  }
  const [eyebrow, title, description] = metadata[page] ?? metadata.Departments
  const source = page === 'Fees' ? feeRecords : page === 'Enrollment' ? portalData.Courses : portalData[page] ?? []
  const query = search.trim().toLowerCase()
  const records = source.filter((item) => [item.title, item.subtitle, item.detail, item.code, item.count].some((value) => value?.toLowerCase().includes(query)))
  const balance = feeRecords.filter((fee) => fee.status !== 'Paid').reduce((sum, fee) => sum + fee.amount, 0)
  const enrolledCount = Object.values(enrolledCourses).filter(Boolean).length
  const borrowedCount = Object.values(borrowedBooks).filter(Boolean).length
  const currency = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount)

  return (
    <>
      <section className="page-heading module-heading">
        <div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p></div>
        <span className="demo-chip"><i /> Student preview</span>
      </section>

      {page === 'Fees' && (
        <>
          <div className="module-summary-grid">
            <article className="module-summary-card module-summary-card--highlight"><span>Outstanding balance</span><strong>{currency(balance)}</strong><small>Due this semester</small></article>
            <article className="module-summary-card"><span>Invoices</span><strong>{feeRecords.length}</strong><small>For Fall {currentYear}</small></article>
            <article className="module-summary-card"><span>Payment status</span><strong>{feeRecords.filter((fee) => fee.status === 'Paid').length} paid</strong><small>{feeRecords.filter((fee) => fee.status !== 'Paid').length} awaiting payment</small></article>
          </div>
          <div className="demo-notice"><Icon name="fees" size={16} /> Demo only: “Record demo payment” changes the sample invoice status. No real payment is processed.</div>
        </>
      )}

      {page === 'Enrollment' && (
        <div className="module-summary-grid">
          <article className="module-summary-card module-summary-card--highlight"><span>Enrolled courses</span><strong>{enrolledCount}</strong><small>Fall {currentYear} semester</small></article>
          <article className="module-summary-card"><span>Credit load</span><strong>{portalData.Courses.filter((course) => enrolledCourses[course.code]).reduce((sum, course) => sum + Number(course.subtitle.match(/\d+/)?.[0] ?? 0), 0)} credits</strong><small>Across current selections</small></article>
          <article className="module-summary-card"><span>Available courses</span><strong>{portalData.Courses.length - enrolledCount}</strong><small>Catalog choices</small></article>
        </div>
      )}

      {page === 'Library' && (
        <div className="module-summary-grid module-summary-grid--two">
          <article className="module-summary-card module-summary-card--highlight"><span>My checked-out books</span><strong>{borrowedCount}</strong><small>Keep track of your library loans</small></article>
          <article className="module-summary-card"><span>Catalog results</span><strong>{portalData.Library.length}</strong><small>Search books across campus libraries</small></article>
        </div>
      )}

      <section className="directory-card module-directory">
        <div className="directory-toolbar">
          <div className="directory-title"><h2>{page === 'Fees' ? 'My invoices' : page === 'Enrollment' ? 'Fall course catalog' : page === 'Library' ? 'Library catalog' : `All ${page.toLowerCase()}`}</h2><span>{records.length} records</span></div>
          <label className="search-box"><Icon name="search" size={17} /><input aria-label={`Search ${page}`} placeholder={`Search ${page.toLowerCase()}...`} value={search} onChange={(event) => setSearch(event.target.value)} /></label>
        </div>
        {page === 'Departments' ? (
          <div className="department-card-grid">
            {records.map((item) => <article className="department-info-card" key={item.code}><div className="department-card-top"><span className={`department-code department-code--${item.code.toLowerCase()}`}>{item.code}</span><span className="department-program-count">{item.extra}</span></div><h3>{item.title}</h3><p>{item.subtitle}</p><div className="department-info-footer"><span>{item.detail}</span><strong>{item.count}</strong></div><button className="text-link" onClick={() => onAction('Courses')}>Explore courses <Icon name="arrow" size={14} /></button></article>)}
          </div>
        ) : (
          <div className="table-scroll">
            <table className="students-table module-table">
              <thead>
                {page === 'Fees' ? <tr><th>INVOICE</th><th>DESCRIPTION</th><th>DUE DATE</th><th>AMOUNT</th><th>STATUS</th><th /></tr>
                  : page === 'Faculty' ? <tr><th>FACULTY MEMBER</th><th>DEPARTMENT</th><th>AREA OF EXPERTISE</th><th>CONTACT</th><th>OFFICE</th></tr>
                    : page === 'Library' ? <tr><th>CALL NO.</th><th>BOOK</th><th>SUBJECT</th><th>LOCATION</th><th>LOAN STATUS</th><th /></tr>
                      : <tr><th>COURSE</th><th>DEPARTMENT</th><th>INSTRUCTOR</th><th>SCHEDULE</th><th>SEATS</th><th /></tr>}
              </thead>
              <tbody>
                {records.map((item, index) => page === 'Fees' ? (
                  <tr key={item.id}><td className="student-id">{item.id}</td><td><strong className="module-primary-cell">{item.title}</strong><span className="module-secondary-cell">Fall {currentYear} semester</span></td><td className="date-cell">{formatDate(item.date)}</td><td className="module-amount">{currency(item.amount)}</td><td><span className={`status-pill ${item.status === 'Paid' ? 'status-active' : 'status-leave'}`}><i />{item.status}</span></td><td className="module-action-cell">{item.status !== 'Paid' && <button className="secondary-button module-action-button" onClick={() => onAction('pay', item)}>Record demo payment</button>}</td></tr>
                ) : page === 'Faculty' ? (
                  <tr key={item.code}><td><div className="student-person"><div className={`student-avatar avatar-${index % 6}`}>{item.code}</div><div><strong>{item.title}</strong><span>{item.subtitle}</span></div></div></td><td>{item.subtitle.split(' · ')[0]}</td><td>{item.detail}</td><td><a className="module-email" href={`mailto:${item.count}`}>{item.count}</a></td><td>{item.extra}</td></tr>
                ) : page === 'Library' ? (
                  <tr key={item.code}><td className="student-id">{item.code}</td><td><strong className="module-primary-cell">{item.title}</strong><span className="module-secondary-cell">{item.subtitle}</span></td><td>{item.detail}</td><td>{item.count}</td><td><span className={`status-pill ${borrowedBooks[item.code] ? 'status-leave' : 'status-active'}`}><i />{borrowedBooks[item.code] ? 'Checked out' : 'Available'}</span></td><td className="module-action-cell"><button className="secondary-button module-action-button" onClick={() => onAction('borrow', item)}>{borrowedBooks[item.code] ? 'Return' : 'Borrow'}</button></td></tr>
                ) : (
                  <tr key={item.code}><td><strong className="module-primary-cell">{item.code} · {item.title}</strong><span className="module-secondary-cell">{item.subtitle}</span></td><td>{item.subtitle.split(' · ')[0]}</td><td>{item.detail}</td><td>{item.count}</td><td>{item.extra}</td><td className="module-action-cell">{page === 'Enrollment' && <button className={enrolledCourses[item.code] ? 'secondary-button module-action-button' : 'primary-button module-action-button'} onClick={() => onAction('enroll', item)}>{enrolledCourses[item.code] ? 'Enrolled · Drop' : 'Enroll'}</button>}</td></tr>
                ))}
                {!records.length && <tr><td className="empty-state" colSpan="6"><span>No matching records</span><p>Try a different search.</p></td></tr>}
              </tbody>
            </table>
          </div>
        )}
        <div className="table-footer"><span>Showing <strong>{records.length}</strong> sample records · changes are temporary preview data</span></div>
      </section>
      {page === 'Enrollment' && <p className="module-footnote">Enrollment changes are shown in this preview only. Connect an enrollment service to save selections to a student account.</p>}
      {page === 'Library' && <p className="module-footnote">Borrow and return actions update this preview only; connect the campus library system for live loans.</p>}
    </>
  )
}

function Dashboard({ students, activeCount, departmentCount, onViewStudents, onViewPage }) {
  const departmentTotals = students.reduce((totals, student) => {
    totals[student.department] = (totals[student.department] ?? 0) + 1
    return totals
  }, {})
  const bars = [
    { label: 'Computer Science', value: departmentTotals['Computer Science'] ?? 0, color: 'blue' },
    { label: 'Business', value: departmentTotals.Business ?? 0, color: 'purple' },
    { label: 'Engineering', value: departmentTotals.Engineering ?? 0, color: 'orange' },
    { label: 'Design', value: departmentTotals.Design ?? 0, color: 'green' },
  ]
  const maxTotal = Math.max(...bars.map((bar) => bar.value), 1)

  return (
    <>
      <section className="welcome-panel">
        <div className="welcome-copy"><span className="eyebrow">{currentDateLabel}</span><h1>Good morning, Alex <span>✳</span></h1><p>Here's what's happening across your campus today.</p></div>
        <div className="welcome-art" aria-hidden="true"><div className="art-sun" /><div className="art-building"><i /><i /><i /><i /><i /><i /></div><div className="art-ground" /></div>
      </section>
      <section className="stats-grid" aria-label="Campus statistics">
        <article className="stat-card"><div className="stat-top"><span>Total students</span><span className="stat-icon stat-icon--blue"><Icon name="users" size={17} /></span></div><div className="stat-value">{students.length.toLocaleString()}</div><div className="stat-foot"><span className="trend-up"><Icon name="arrow" size={13} /> 8.2%</span><span>vs. last semester</span></div><div className="sparkline sparkline--blue"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div></article>
        <article className="stat-card"><div className="stat-top"><span>Active students</span><span className="stat-icon stat-icon--green"><Icon name="book" size={17} /></span></div><div className="stat-value">{activeCount.toLocaleString()}</div><div className="stat-foot"><span className="trend-up"><Icon name="arrow" size={13} /> 4.6%</span><span>vs. last semester</span></div><div className="sparkline sparkline--green"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div></article>
        <article className="stat-card"><div className="stat-top"><span>Departments</span><span className="stat-icon stat-icon--purple"><Icon name="grid" size={17} /></span></div><div className="stat-value">{departmentCount.toString().padStart(2, '0')}</div><div className="stat-foot"><span className="stat-neutral">Across campus</span></div><div className="sparkline sparkline--purple"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div></article>
        <article className="stat-card"><div className="stat-top"><span>Today's attendance</span><span className="stat-icon stat-icon--orange"><Icon name="calendar" size={17} /></span></div><div className="stat-value">94.2<span className="stat-percent">%</span></div><div className="stat-foot"><span className="trend-up"><Icon name="arrow" size={13} /> 1.8%</span><span>vs. last week</span></div><div className="sparkline sparkline--orange"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div></article>
      </section>
      <section className="quick-access-panel">
        <div className="quick-access-heading"><div><h2>Your campus, at a glance</h2><p>Jump straight into the services you need.</p></div><span className="demo-chip"><i /> Sample campus data</span></div>
        <div className="quick-access-grid">
          {navItems.filter((item) => item.label !== 'Overview').map((item) => <button className="quick-access-link" key={item.label} onClick={() => onViewPage(item.label)}><span className="quick-access-icon"><Icon name={item.icon} size={18} /></span><span>{item.label}</span><Icon name="chevron" size={15} /></button>)}
        </div>
      </section>
      <section className="dashboard-grid">
        <article className="panel enrollment-panel">
          <div className="panel-heading"><div><h2>Students by department</h2><p>Enrollment overview for Fall {currentYear}</p></div><button className="period-select">This semester <span>⌄</span></button></div>
          <div className="chart-area">
            <div className="chart-y-labels"><span>100</span><span>75</span><span>50</span><span>25</span><span>0</span></div>
            <div className="bar-chart">{['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'].map((month, index) => <div className="chart-group" key={month}><div className="chart-bars"><i style={{ height: `${35 + ((index * 17 + 12) % 48)}%` }} /><i style={{ height: `${23 + ((index * 13 + 21) % 42)}%` }} /></div><span>{month}</span></div>)}</div>
          </div>
          <div className="chart-legend"><span><i className="legend-blue" /> New students</span><span><i className="legend-light" /> Returning</span></div>
        </article>
        <article className="panel department-panel">
          <div className="panel-heading"><div><h2>Department mix</h2><p>Students across departments</p></div><button className="icon-button subtle-button" aria-label="Department options"><Icon name="more" /></button></div>
          <div className="department-bars">{bars.map((bar) => <div className="department-row" key={bar.label}><div className="department-label"><span>{bar.label}</span><strong>{bar.value}</strong></div><div className="progress-track"><i className={`progress-${bar.color}`} style={{ width: `${(bar.value / maxTotal) * 100}%` }} /></div></div>)}</div>
          <button className="text-link" onClick={onViewStudents}>View student directory <Icon name="arrow" size={14} /></button>
        </article>
      </section>
      <section className="dashboard-grid lower-grid">
        <article className="panel activity-panel">
          <div className="panel-heading"><div><h2>Recent activity</h2><p>Latest updates from your campus</p></div><button className="text-link">View all <Icon name="arrow" size={14} /></button></div>
          <div className="activity-list">
            <div className="activity-item"><span className="activity-avatar activity-avatar--blue"><Icon name="users" size={16} /></span><div><p><strong>New student enrollment</strong><span> · Priya Kapoor joined Computer Science</span></p><span className="activity-time">Today, 9:42 AM</span></div></div>
            <div className="activity-item"><span className="activity-avatar activity-avatar--purple"><Icon name="book" size={16} /></span><div><p><strong>Course updated</strong><span> · Data Structures &amp; Algorithms</span></p><span className="activity-time">Today, 9:15 AM</span></div></div>
            <div className="activity-item"><span className="activity-avatar activity-avatar--orange"><Icon name="calendar" size={16} /></span><div><p><strong>Attendance recorded</strong><span> · Engineering, Year 2 · 38 students</span></p><span className="activity-time">Today, 8:30 AM</span></div></div>
          </div>
        </article>
        <article className="panel schedule-panel">
          <div className="panel-heading"><div><h2>Up next</h2><p>Your campus schedule today</p></div><button className="icon-button subtle-button" aria-label="Schedule options"><Icon name="more" /></button></div>
          <div className="schedule-list">
            <div className="schedule-item"><span className="schedule-time">10:30<span>AM</span></span><i className="schedule-line schedule-line--blue" /><div><strong>Faculty meeting</strong><span><Icon name="clock" size={13} /> Conference room A</span></div></div>
            <div className="schedule-item"><span className="schedule-time">12:00<span>PM</span></span><i className="schedule-line schedule-line--purple" /><div><strong>Admissions review</strong><span><Icon name="clock" size={13} /> Admin building · 2nd floor</span></div></div>
            <div className="schedule-item"><span className="schedule-time">02:15<span>PM</span></span><i className="schedule-line schedule-line--orange" /><div><strong>Campus tour</strong><span><Icon name="clock" size={13} /> Main entrance</span></div></div>
          </div>
        </article>
      </section>
    </>
  )
}

export default App
