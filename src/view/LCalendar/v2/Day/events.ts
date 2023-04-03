export function createEvents() {
  const now = new Date()
  const nowY = now.getFullYear()
  const nowM = now.getMonth()
  const nowD = now.getDate()
  return [
    {
      id: 0,
      title: 'All Day Event very long title',
      allDay: true,
      start: new Date(
        nowY, nowM, nowD
      ),
      end: new Date(
        nowY, nowM, nowD
      ),
    },
    {
      id: 1,
      title: 'Long Event',
      start: new Date(
        nowY, nowM, nowD
      ),
      end: new Date(
        nowY, nowM, nowD
      ),
    },

    {
      id: 2,
      title: 'DTS STARTS',
      start: new Date(
        nowY, nowM, nowD, 0, 0, 0
      ),
      end: new Date(
        nowY, nowM, nowD,  0, 0, 0
      ),
    },

    {
      id: 3,
      title: 'DTS ENDS',
      start: new Date(
        nowY, nowM, nowD,  0, 0, 0
      ),
      end: new Date(
        nowY, nowM, nowD,  0, 0, 0
      ),
    },

    {
      id: 6,
      title: 'Meeting',
      start: new Date(
        nowY, nowM, nowD,  10, 30, 0, 0
      ),
      end: new Date(
        nowY, nowM, nowD,  12, 30, 0, 0
      ),
      desc: 'Pre-meeting meeting, to prepare for the meeting',
    },
    {
      id: 11,
      title: 'Planning Meeting with Paige',
      start: new Date(
        nowY, nowM, nowD,  8, 0, 0
      ),
      end: new Date(
        nowY, nowM, nowD,  10, 30, 0
      ),
    },
    {
      id: 11.1,
      title: 'Inconvenient Conference Call',
      start: new Date(
        nowY, nowM, nowD,  9, 30, 0
      ),
      end: new Date(
        nowY, nowM, nowD,  12, 0, 0
      ),
    },
    {
      id: 11.2,
      title: 'Project Kickoff - Lou\'s Shoes',
      start: new Date(
        nowY, nowM, nowD,  11, 30, 0
      ),
      end: new Date(
        nowY, nowM, nowD,  14, 0, 0
      ),
    },
    {
      id: 14,
      title: 'Today',
      start: new Date(new Date()
        .setHours(new Date()
          .getHours() - 3)),
      end: new Date(new Date()
        .setHours(new Date()
          .getHours() + 3)),
    },
    {
      id: 15,
      title: 'Point in Time Event',
      start: now,
      end: now,
    }
  ]
}
