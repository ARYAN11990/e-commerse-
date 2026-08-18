import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ChevronRight as BreadcrumbRight } from 'lucide-react';
import FormModal from '../components/FormModal';
import { Input, Select } from '../components/Form';
import { useToast } from '../context/ToastContext';

const CalendarApp = () => {
  // Use current date for "today" features, but let's default to Aug 2026 to match reference, or current date.
  // The user says "Do not hardcode July/August 2026", so use current date by default.
  const [currentDate, setCurrentDate] = useState(new Date()); 
  const { showToast } = useToast();
  
  // Use existing mock event data logic
  const [events, setEvents] = useState([
    { id: 1, title: 'Event Conf.', date: '2026-08-01', type: 'red' },
    { id: 2, title: 'Seminar #4', date: '2026-08-07', type: 'green' },
    { id: 3, title: '4p Meeting #5', date: '2026-08-09', type: 'blue', hasBar: true },
    { id: 4, title: 'Seminar #6', date: '2026-08-11', type: 'red' },
    { id: 5, title: '10:30a Meeting 3', date: '2026-08-12', type: 'green', hasBar: true },
    { id: 6, title: '12p Meetup #', date: '2026-08-12', type: 'blue', hasBar: true },
    { id: 7, title: '2:30p Submission', date: '2026-08-12', type: 'orange', hasBar: true },
    { id: 8, title: '7a Attend event', date: '2026-08-13', type: 'green', hasBar: true },
    { id: 9, title: '4p Submission #1', date: '2026-08-16', type: 'orange', hasBar: true },
    { id: 10, title: 'Project submission #2', date: '2026-08-28', type: 'blue' },
  ]);

  const [modalOpen, setModalOpen] = useState(false);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleAddEvent = (values) => {
    try {
      const newEvent = {
        id: Date.now(),
        title: values.title,
        date: values.date,
        type: values.type,
        hasBar: values.hasBar === 'true'
      };
      setEvents([...events, newEvent]);
      setModalOpen(false);
      if (showToast) showToast('Event added successfully!', 'success');
    } catch (err) {
      if (showToast) showToast('Failed to add event', 'error');
    }
  };

  // Calendar logic
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 (Sun) to 6 (Sat)
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  
  const days = [];
  
  // Previous month padded days
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    days.push({
      date: new Date(year, month - 1, daysInPrevMonth - i),
      isCurrentMonth: false,
    });
  }
  
  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      date: new Date(year, month, i),
      isCurrentMonth: true,
    });
  }
  
  // Next month padded days to complete grid (42 cells for 6 weeks)
  const remainingCells = 42 - days.length;
  for (let i = 1; i <= remainingCells; i++) {
    days.push({
      date: new Date(year, month + 1, i),
      isCurrentMonth: false,
    });
  }

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  const formatDateString = (dateObj) => {
    const y = dateObj.getFullYear();
    const m = String(dateObj.getMonth() + 1).padStart(2, '0');
    const d = String(dateObj.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const getTypeStyles = (type, hasBar) => {
    const base = 'rounded-sm px-2 py-1 text-xs font-medium truncate mb-1';
    const styles = {
      red: hasBar ? 'border-l-[3px] border-[#F87171] bg-[#FEF2F2] text-[#DC2626] dark:bg-[#F87171]/10 dark:text-[#F87171]' : 'bg-[#FEF2F2] text-[#DC2626] dark:bg-[#F87171]/10 dark:text-[#F87171]',
      green: hasBar ? 'border-l-[3px] border-[#10B981] bg-[#F0FDF4] text-[#10B981] dark:bg-[#10B981]/10 dark:text-[#10B981]' : 'bg-[#F0FDF4] text-[#10B981] dark:bg-[#10B981]/10 dark:text-[#10B981]',
      blue: hasBar ? 'border-l-[3px] border-[#3C50E0] bg-[#EFF4FB] text-[#3C50E0] dark:bg-[#3C50E0]/10 dark:text-[#3C50E0]' : 'bg-[#EFF4FB] text-[#3C50E0] dark:bg-[#3C50E0]/10 dark:text-[#3C50E0]',
      orange: hasBar ? 'border-l-[3px] border-[#F59E0B] bg-[#FFFBEB] text-[#F59E0B] dark:bg-[#F59E0B]/10 dark:text-[#F59E0B]' : 'bg-[#FFFBEB] text-[#F59E0B] dark:bg-[#F59E0B]/10 dark:text-[#F59E0B]',
    };
    return `${base} ${styles[type] || styles.blue}`;
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-2xl font-bold text-[#1C2434] dark:text-white">Calendar</h2>
        <div className="flex items-center gap-2 mt-2 sm:mt-0 text-sm font-medium">
          <NavLink className="text-[#64748B] dark:text-[#8A99AF] hover:text-[#1C2434] dark:hover:text-white transition" to="/">Home</NavLink>
          <BreadcrumbRight className="w-4 h-4 text-[#64748B] dark:text-[#8A99AF]" />
          <span className="text-[#3C50E0]">Calendar</span>
        </div>
      </div>

      <div className="w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        {/* Calendar Header */}
        <div className="flex flex-col sm:grid sm:grid-cols-3 items-center border-b border-stroke px-4 py-4 sm:px-6 sm:py-5 dark:border-strokedark gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start justify-self-start">
            <div className="flex items-center gap-1 border border-stroke rounded-md p-1 dark:border-strokedark">
              <button onClick={handlePrevMonth} className="rounded-md p-1 hover:bg-gray dark:hover:bg-meta-4 text-[#64748B] transition">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={handleNextMonth} className="rounded-md p-1 hover:bg-gray dark:hover:bg-meta-4 text-[#64748B] transition">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <button 
              onClick={() => setModalOpen(true)}
              className="rounded-md bg-[#3C50E0] py-2 px-4 text-sm font-medium text-white hover:bg-opacity-90 transition whitespace-nowrap"
            >
              Add Event +
            </button>
          </div>
          
          <h3 className="text-lg font-bold text-[#1C2434] dark:text-white text-center justify-self-center">
            {monthNames[month]} {year}
          </h3>
          
          <div className="flex items-center border border-stroke rounded-md dark:border-strokedark overflow-hidden w-full sm:w-auto justify-center sm:justify-end justify-self-end">
            <button className="px-4 py-2 text-sm font-medium bg-[#3C50E0] text-white border-r border-stroke dark:border-strokedark transition hover:bg-opacity-90">month</button>
            <button className="px-4 py-2 text-sm font-medium hover:bg-gray dark:hover:bg-meta-4 text-[#64748B] transition border-r border-stroke dark:border-strokedark">week</button>
            <button className="px-4 py-2 text-sm font-medium hover:bg-gray dark:hover:bg-meta-4 text-[#64748B] transition">day</button>
          </div>
        </div>

        {/* Calendar Grid Wrapper for Mobile Scroll */}
        <div className="w-full overflow-x-auto">
          {/* Explicit minimum width to prevent collapsing on mobile, and force grid layout using style to guarantee it works regardless of Tailwind version scanning */}
          <div className="min-w-[700px] flex flex-col">
            
            {/* Days Header */}
            <div 
              className="border-b border-stroke dark:border-strokedark" 
              style={{ display: 'grid', gridTemplateColumns: 'repeat(7, minmax(0, 1fr))' }}
            >
              {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                <div key={day} className="py-4 text-left pl-2 sm:pl-4 text-xs font-semibold tracking-wider text-[#64748B] dark:text-[#8A99AF]">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Days Grid */}
            <div 
              className="bg-stroke dark:bg-strokedark gap-px"
              style={{ display: 'grid', gridTemplateColumns: 'repeat(7, minmax(0, 1fr))' }}
            >
              {days.map((dayObj, index) => {
                const dateStr = formatDateString(dayObj.date);
                const dayEvents = events.filter(e => e.date === dateStr);
                const isToday = new Date().toDateString() === dayObj.date.toDateString();
                
                return (
                  <div 
                    key={index} 
                    className={`min-h-[140px] bg-white p-2 sm:p-4 transition-colors dark:bg-boxdark relative ${
                      !dayObj.isCurrentMonth ? 'opacity-40 text-[#64748B]' : 'text-[#1C2434] dark:text-white'
                    } hover:bg-gray/50 dark:hover:bg-meta-4/50 ${isToday ? 'bg-gray/20 dark:bg-meta-4/20' : ''}`}
                  >
                    <div className="mb-2">
                      <span className={`inline-flex items-center justify-center text-sm font-medium ${
                        isToday ? 'h-7 w-7 rounded-full bg-[#3C50E0] text-white' : ''
                      }`}>
                        {dayObj.date.getDate()}
                      </span>
                    </div>
                    
                    <div className="flex flex-col">
                      {dayEvents.map(event => (
                        <div 
                          key={event.id}
                          className={getTypeStyles(event.type, event.hasBar)}
                          title={event.title}
                        >
                          {event.title}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>

      <FormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add Event"
        initialValues={{ title: '', date: '', type: 'blue', hasBar: 'false' }}
        validationRules={{
          title: { required: 'Event title is required' },
          date: { required: 'Date is required' }
        }}
        onSubmit={handleAddEvent}
        submitText="Add Event"
      >
        <div className="grid grid-cols-1 gap-4">
          <Input name="title" label="Event Title" placeholder="Enter event title" />
          <Input name="date" label="Event Date" type="date" />
          <div className="grid grid-cols-2 gap-4">
            <Select name="type" label="Event Color" options={[
              { value: 'blue', label: 'Blue' },
              { value: 'green', label: 'Green' },
              { value: 'red', label: 'Red' },
              { value: 'orange', label: 'Orange' },
            ]} />
            <Select name="hasBar" label="Has Left Bar" options={[
              { value: 'false', label: 'No' },
              { value: 'true', label: 'Yes' },
            ]} />
          </div>
        </div>
      </FormModal>
    </>
  );
};

export default CalendarApp;
