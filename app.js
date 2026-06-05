const students = [
  { id: 1, name: "Andrea Luna", phone: "6861413081", instrument: "Canto", type: "Personalizada", teacher: "Selia", days: "Lunes y miércoles", schedule: "4:00-5:00 PM", payment: "$1,000/sesión" },
  { id: 2, name: "María José Carmona", phone: "6861512960", instrument: "Canto", type: "Grupal", teacher: "Selia", days: "Lunes y miércoles", schedule: "6:00-7:00 PM", payment: "$1,500/mes" },
  { id: 3, name: "Emma Ko", phone: "6862923813", instrument: "Canto", type: "Grupal", teacher: "Selia", days: "Lunes y miércoles", schedule: "6:00-7:00 PM", payment: "$1,500/mes" },
  { id: 4, name: "Naomi G.", phone: "6861641859", instrument: "Guitarra y Canto", type: "Grupal", teacher: "Héctor/Selia", days: "Lun-Mié", schedule: "5:00-7:00 PM", payment: "$2,900/mes" },
  { id: 5, name: "Leonardo Santos", phone: "6861872901", instrument: "Piano", type: "Grupal", teacher: "Martín", days: "Lun-Mié", schedule: "5:00-6:00 PM", payment: "$1,500/mes" },
  { id: 6, name: "Noah Guerrero", phone: "+1 9282716705", instrument: "Piano", type: "Grupal", teacher: "Martín", days: "Lun-Mié", schedule: "5:00-6:00 PM", payment: "$1,500/mes" },
  { id: 7, name: "Fernanda Olea", phone: "6862802670", instrument: "Piano", type: "Grupal", teacher: "Héctor", days: "Mar-Jue", schedule: "4:15-5:15 PM", payment: "$1,500/mes" },
  { id: 8, name: "Paulina Higuera", phone: "6869455925", instrument: "Piano", type: "Grupal", teacher: "Héctor", days: "Mar-Jue", schedule: "4:15-5:15 PM", payment: "$1,500/mes" },
  { id: 9, name: "María Fernanda Higuera", phone: "6869455925", instrument: "Piano", type: "Grupal", teacher: "Héctor", days: "Mar-Jue", schedule: "4:15-5:15 PM", payment: "$1,500/mes" },
  { id: 10, name: "Luciana Talamante", phone: "6862250032", instrument: "Todos", type: "Personalizada", teacher: "Héctor", days: "Sábado", schedule: "10:00-11:00 AM", payment: "$1,000/sesión" },
  { id: 11, name: "Luis Alberto Ruiz", phone: "6862439223", instrument: "Guitarra", type: "Grupal", teacher: "Héctor", days: "Lun-Mié", schedule: "5:00-6:00 PM", payment: "$1,500/mes" },
  { id: 12, name: "Rodolfo Tejada", phone: "6862620547", instrument: "Guitarra", type: "Grupal", teacher: "Héctor", days: "Lun-Mié", schedule: "5:00-6:00 PM", payment: "$1,500/mes" },
  { id: 13, name: "Carlos Andrés Sandoval", phone: "6862220090", instrument: "Batería", type: "Grupal", teacher: "Martín", days: "Lun-Mié", schedule: "4:00-5:00 PM", payment: "$1,500/mes" },
  { id: 14, name: "Sara Yee", phone: "6861734185", instrument: "Batería Adultos", type: "Grupal", teacher: "Martín", days: "Lunes", schedule: "8:00-9:30 PM", payment: "$1,200/mes" },
  { id: 15, name: "Paty G.", phone: "6861641859", instrument: "Batería/Canto/Piano", type: "Mixto", teacher: "Martín/Selia", days: "Lun-Jue", schedule: "Variable", payment: "$1,200+sesiones" },
  { id: 16, name: "Panchito Garín", phone: "6861136782", instrument: "Todos", type: "Personalizada", teacher: "Héctor", days: "Viernes", schedule: "5:30-7:00 PM", payment: "$750/sesión" },
  { id: 17, name: "Fátima Garín", phone: "6861136782", instrument: "Todos", type: "Personalizada", teacher: "Héctor", days: "Viernes", schedule: "5:30-7:00 PM", payment: "$750/sesión" },
  { id: 18, name: "María Luisa Téllez", phone: "6862404564", instrument: "Canto Adultos", type: "Grupal", teacher: "Balvis", days: "Martes", schedule: "8:00-9:30 PM", payment: "$1,500/mes" },
  { id: 19, name: "Jessica Garnier", phone: "6862219359", instrument: "Canto Adultos", type: "Grupal", teacher: "Balvis", days: "Martes", schedule: "8:00-9:30 PM", payment: "$1,500/mes" },
  { id: 20, name: "Sasha González", phone: "6866051493", instrument: "Canto", type: "Grupal", teacher: "Selia", days: "Lun-Mié", schedule: "6:00-7:00 PM", payment: "$1,500/mes" },
  { id: 21, name: "Antonieta Cubedo", phone: "6863046720", instrument: "Canto", type: "Grupal", teacher: "Selia", days: "Lun-Mié", schedule: "6:00-7:00 PM", payment: "$1,500/mes" },
  { id: 22, name: "Fabián Román", phone: "6862360234", instrument: "Todos", type: "Personalizada", teacher: "Héctor", days: "Martes", schedule: "6:30-7:30 PM", payment: "$1,000/sesión" },
  { id: 23, name: "Nina Cruz", phone: "+1 7605564400", instrument: "Piano/Canto", type: "Mixto", teacher: "Héctor", days: "Variable", schedule: "Variable", payment: "$1,500+sesiones" },
  { id: 24, name: "Juan Pablo Calderón", phone: "5543681848", instrument: "Piano", type: "Grupal", teacher: "Martín", days: "Lun-Mié", schedule: "5:00-6:00 PM", payment: "$1,500/mes" },
  { id: 25, name: "Nathalia Ochoa", phone: "6862429762", instrument: "Guitarra", type: "Grupal", teacher: "Héctor", days: "Lun-Mié", schedule: "5:00-6:00 PM", payment: "$1,500/mes" },
  { id: 26, name: "Renata Roldán", phone: "6862483175", instrument: "Canto", type: "Grupal", teacher: "Selia", days: "Lun-Mié", schedule: "6:00-7:00 PM", payment: "$1,500/mes" },
  { id: 27, name: "Valeria Núñez", phone: "6861845498", instrument: "Canto Adultos", type: "Grupal", teacher: "Balvis", days: "Martes", schedule: "8:00-9:30 PM", payment: "$1,500/mes" },
  { id: 28, name: "Diego Gaytán", phone: "5535660967", instrument: "Todos", type: "Personalizada", teacher: "Héctor", days: "Lunes", schedule: "6:00-7:00 PM", payment: "$1,000/sesión" },
  { id: 29, name: "Carlos Vizcarra", phone: "6862778229", instrument: "Todos", type: "Personalizada", teacher: "Héctor", days: "Jueves", schedule: "3:15-4:15 PM", payment: "$500/sesión" },
  { id: 30, name: "Gabriel Vizcarra", phone: "6862778229", instrument: "Todos", type: "Personalizada", teacher: "Héctor", days: "Jueves", schedule: "3:15-4:15 PM", payment: "$500/sesión" },
  { id: 31, name: "Liz Sandoval", phone: "6531300105", instrument: "Guitarra", type: "Personalizada", teacher: "Héctor", days: "Sábado", schedule: "11:00-12:00 PM", payment: "$500/sesión" },
  { id: 32, name: "Abel", phone: "6531300105", instrument: "Guitarra", type: "Personalizada", teacher: "Héctor", days: "Sábado", schedule: "11:00-12:00 PM", payment: "$500/sesión" },
  { id: 33, name: "Valeria Pico", phone: "8180751068", instrument: "Canto", type: "Personalizada", teacher: "Selia", days: "Lun-Mié", schedule: "5:00-6:00 PM", payment: "$500/sesión" },
  { id: 34, name: "Lucian Espinoza", phone: "Pendiente", instrument: "Canto", type: "Personalizada", teacher: "Selia", days: "Lun-Mié", schedule: "5:00-6:00 PM", payment: "$500/sesión" },
  { id: 35, name: "Amairany G.", phone: "6861641859", instrument: "Piano/Canto", type: "Grupal", teacher: "Martín/Selia", days: "Lun-Mié", schedule: "5:00-7:00 PM", payment: "$2,900/mes" },
  { id: 36, name: "Jorge Villar", phone: "6866047474", instrument: "Todos", type: "Personalizada", teacher: "Héctor", days: "Viernes", schedule: "4:30-5:30 PM", payment: "$1,000/sesión" },
  { id: 37, name: "Camila Favela", phone: "6862214371", instrument: "Todos", type: "Personalizada", teacher: "Héctor", days: "Viernes", schedule: "3:00-4:00 PM", payment: "$500/sesión" },
  { id: 38, name: "Emilio Favela", phone: "6862214371", instrument: "Todos", type: "Personalizada", teacher: "Héctor", days: "Viernes", schedule: "3:00-4:00 PM", payment: "$500/sesión" },
  { id: 39, name: "Zarela Pereztejada", phone: "+1 8582647666", instrument: "Batería Adultos", type: "Grupal", teacher: "Martín", days: "Lunes", schedule: "8:00-9:30 PM", payment: "$1,500/mes" },
  { id: 40, name: "María Elisa Aviléz", phone: "+1 4423541459", instrument: "Piano", type: "Personalizada", teacher: "Héctor", days: "Martes", schedule: "7:30-8:30 PM", payment: "$500/sesión" },
  { id: 41, name: "Erika Elías", phone: "6865092562", instrument: "Piano", type: "Personalizada", teacher: "Héctor", days: "Martes", schedule: "7:30-8:30 PM", payment: "$500/sesión" },
  { id: 42, name: "Hans Cruger", phone: "6461514087", instrument: "Todos", type: "Personalizada", teacher: "Héctor", days: "Jueves", schedule: "5:30-6:30 PM", payment: "$1,000/sesión" },
];

const payments = students.map((student) => ({
  student: student.name,
  parent: student.phone,
  program: `${student.instrument} · ${student.type}`,
  due: student.payment.includes("/mes") ? "05 junio" : "Por sesión",
  amount: student.payment,
  status: student.id % 7 === 0 ? "Vencido" : student.id % 3 === 0 ? "Pagado" : "Pendiente",
}));

const agenda = [
  { time: "3:00-4:00 PM", title: "Personalizada · Todos", meta: "Héctor · Camila Favela, Emilio Favela · Viernes" },
  { time: "4:30-5:30 PM", title: "Personalizada · Todos", meta: "Héctor · Jorge Villar · Viernes" },
  { time: "5:30-7:00 PM", title: "Personalizada · Todos", meta: "Héctor · Panchito Garín, Fátima Garín · Viernes" },
  { time: "Sábado 10:00 AM", title: "Personalizada · Todos", meta: "Héctor · Luciana Talamante" },
  { time: "Sábado 11:00 AM", title: "Personalizada · Guitarra", meta: "Héctor · Liz Sandoval, Abel" },
];

const messages = [
  {
    from: "Carla Arreola",
    text: "Enviare comprobante de Valentina por la tarde.",
  },
  {
    from: "Prof. Melissa",
    text: "Viernes tiene 5 alumnos personalizados con Héctor.",
  },
  {
    from: "Administracion",
    text: "Recordatorios de mayo preparados para envio.",
  },
];

const tasks = [
  {
    title: "42 alumnos activos",
    text: "Base importada desde el PDF de Harmony.",
  },
  {
    title: "1 telefono pendiente",
    text: "Falta confirmar el tutor de Lucian Espinoza.",
  },
  {
    title: "Pagos por sesion",
    text: "Conviene confirmar si se cobraran como paquete o por clase tomada.",
  },
];

const attendance = [
  { name: "Camila Favela", instrument: "Todos", status: "asistio" },
  { name: "Emilio Favela", instrument: "Todos", status: "asistio" },
];

const viewTitles = {
  admin: "Panel Harmony",
  teacher: "Cuenta de maestro",
  parent: "Portal de papás",
};

const statusClasses = {
  Pagado: "paid",
  Pendiente: "pending",
  Vencido: "overdue",
};

const DEMO_USER = "admin";
const DEMO_PASSWORD = "Harmony2026!";
const SESSION_KEY = "harmony-demo-session";
let hasRenderedPrivateData = false;

function moneyToNumber(value) {
  const match = value.replace(/,/g, "").match(/\d+/);
  return match ? Number(match[0]) : 0;
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.setTimeout(() => toast.classList.remove("is-visible"), 3200);
}

function renderKpis() {
  const paidTotal = payments
    .filter((payment) => payment.status === "Pagado")
    .reduce((sum, payment) => sum + moneyToNumber(payment.amount), 0);
  const pendingCount = payments.filter((payment) => payment.status === "Pendiente").length;
  const overdueCount = payments.filter((payment) => payment.status === "Vencido").length;

  const kpis = [
    { label: "Pagado este mes", value: `$${paidTotal.toLocaleString("es-MX")}`, hint: "2 pagos confirmados" },
    { label: "Pendiente", value: pendingCount, hint: "Mensualidades por cobrar" },
    { label: "Vencido", value: overdueCount, hint: "Requieren recordatorio" },
    { label: "Clases de hoy", value: agenda.length, hint: "Agenda activa" },
  ];

  document.querySelector("#kpi-grid").innerHTML = kpis
    .map(
      (kpi) => `
        <article class="kpi-card">
          <span>${kpi.label}</span>
          <strong>${kpi.value}</strong>
          <p>${kpi.hint}</p>
        </article>
      `,
    )
    .join("");
}

function renderPayments() {
  document.querySelector("#payments-body").innerHTML = payments
    .map(
      (payment) => `
        <tr>
          <td class="student-cell">
            <strong>${payment.student}</strong>
            <span>${payment.program}</span>
          </td>
          <td>${payment.parent}</td>
          <td>${payment.program}</td>
          <td>${payment.due}</td>
          <td><strong>${payment.amount}</strong></td>
          <td><span class="status-chip ${statusClasses[payment.status]}">${payment.status}</span></td>
          <td>
            <button class="row-button reminder-button" ${payment.status === "Pagado" ? "disabled" : ""} data-student="${payment.student}" type="button">
              Recordar
            </button>
          </td>
        </tr>
      `,
    )
    .join("");
}

function renderAgenda() {
  document.querySelector("#agenda-list").innerHTML = agenda
    .map(
      (item) => `
        <article class="agenda-item">
          <span class="agenda-time">${item.time}</span>
          <div>
            <h3>${item.title}</h3>
            <p>${item.meta}</p>
          </div>
        </article>
      `,
    )
    .join("");
}

function renderMessages() {
  document.querySelector("#message-list").innerHTML = messages
    .map(
      (message) => `
        <article class="message-item">
          <h3>${message.from}</h3>
          <p>${message.text}</p>
        </article>
      `,
    )
    .join("");
}

function renderTasks() {
  document.querySelector("#task-grid").innerHTML = tasks
    .map(
      (task) => `
        <article class="task-item">
          <h3>${task.title}</h3>
          <p>${task.text}</p>
        </article>
      `,
    )
    .join("");
}

function renderAttendance() {
  document.querySelector("#attendance-list").innerHTML = attendance
    .map(
      (student, index) => `
        <article class="attendance-row">
          <div>
            <strong>${student.name}</strong>
            <span>${student.instrument}</span>
          </div>
          <div class="attendance-actions" data-index="${index}">
            <button class="${student.status === "asistio" ? "is-selected" : ""}" data-status="asistio" type="button">Asistio</button>
            <button class="${student.status === "tarde" ? "is-selected" : ""}" data-status="tarde" type="button">Tarde</button>
            <button class="${student.status === "falto" ? "is-selected" : ""}" data-status="falto" type="button">Falto</button>
          </div>
        </article>
      `,
    )
    .join("");
}

function switchView(viewName) {
  document.querySelectorAll(".role-tab").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.view === viewName);
  });

  document.querySelectorAll(".view").forEach((view) => {
    view.classList.toggle("is-active", view.id === `${viewName}-view`);
  });

  document.querySelector("#view-title").textContent = viewTitles[viewName];
}

async function showDemoNotification() {
  const message = "Harmony: Andrea Luna tiene un pago pendiente de $1,000.";

  if (!("Notification" in window)) {
    showToast(message);
    return;
  }

  if (Notification.permission === "default") {
    await Notification.requestPermission();
  }

  if (Notification.permission === "granted") {
    new Notification("Harmony Music School", {
      body: message,
      icon: "assets/harmony-mark-navy.png",
    });
  }

  showToast(message);
}

function attachEvents() {
  document.querySelector("#login-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const user = document.querySelector("#login-user").value.trim();
    const password = document.querySelector("#login-password").value;
    const error = document.querySelector("#login-error");

    if (user === DEMO_USER && password === DEMO_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "active");
      error.textContent = "";
      renderPrivateData();
      unlockApp();
      showToast("Sesión iniciada.");
      return;
    }

    error.textContent = "Usuario o contraseña incorrectos.";
  });

  document.querySelector("#logout-button").addEventListener("click", () => {
    sessionStorage.removeItem(SESSION_KEY);
    lockApp();
    showToast("Sesión cerrada.");
  });

  document.querySelectorAll(".role-tab").forEach((button) => {
    button.addEventListener("click", () => switchView(button.dataset.view));
  });

  document.addEventListener("click", (event) => {
    const reminderButton = event.target.closest(".reminder-button");
    if (reminderButton && !reminderButton.disabled) {
      showToast(`Recordatorio preparado para ${reminderButton.dataset.student}.`);
    }

    const attendanceButton = event.target.closest(".attendance-actions button");
    if (attendanceButton) {
      const actions = attendanceButton.closest(".attendance-actions");
      const index = Number(actions.dataset.index);
      attendance[index].status = attendanceButton.dataset.status;
      renderAttendance();
    }
  });

  document.querySelector("#quick-reminder").addEventListener("click", () => {
    const count = payments.filter((payment) => payment.status !== "Pagado").length;
    showToast(`${count} recordatorios preparados para papás con pago pendiente.`);
  });

  document.querySelector("#demo-notification").addEventListener("click", showDemoNotification);

  document.querySelector("#save-attendance").addEventListener("click", () => {
    showToast("Asistencia guardada para Piano inicial.");
  });
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    navigator.serviceWorker.register("sw.js").catch(() => {
      showToast("La app funciona; el modo instalable se activará al publicarla.");
    });
  }
}

function unlockApp() {
  document.querySelector("#login-screen").classList.add("is-hidden");
  document.querySelector("#app-shell").classList.remove("is-locked");
  document.querySelector("#app-shell").setAttribute("aria-hidden", "false");
}

function renderPrivateData() {
  if (hasRenderedPrivateData) return;
  renderKpis();
  renderPayments();
  renderAgenda();
  renderMessages();
  renderTasks();
  renderAttendance();
  hasRenderedPrivateData = true;
}

function lockApp() {
  document.querySelector("#login-screen").classList.remove("is-hidden");
  document.querySelector("#app-shell").classList.add("is-locked");
  document.querySelector("#app-shell").setAttribute("aria-hidden", "true");
  document.querySelector("#login-password").value = "";
  document.querySelector("#login-user").focus();
}

function initApp() {
  attachEvents();
  registerServiceWorker();

  if (sessionStorage.getItem(SESSION_KEY) === "active") {
    renderPrivateData();
    unlockApp();
  } else {
    lockApp();
  }
}

initApp();
