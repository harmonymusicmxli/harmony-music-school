const SUPABASE_URL = "https://odcxspgmlthfsbkhcpjo.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_wpK7ztONoOfLWSG9U9UV0Q_EQVzUF55";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

let payments = [];
let students = [];
let attendance = [];
let hasRenderedPrivateData = false;

const viewTitles = {
  admin: "Panel Harmony",
  teacher: "Cuenta de maestro",
  parent: "Portal de papás",
};

const statusClasses = {
  paid: "paid",
  pending: "pending",
  overdue: "overdue",
  cancelled: "pending",
};

const statusLabels = {
  paid: "Pagado",
  pending: "Pendiente",
  overdue: "Vencido",
  cancelled: "Cancelado",
};

function moneyToNumber(value) {
  return Number(value || 0);
}

function formatMoney(value) {
  return `$${moneyToNumber(value).toLocaleString("es-MX")}`;
}

function formatDueDate(value) {
  if (!value) return "Por sesión";
  const date = new Date(`${value}T00:00:00`);
  return date.toLocaleDateString("es-MX", { day: "2-digit", month: "short" });
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.setTimeout(() => toast.classList.remove("is-visible"), 3200);
}

function setLoading(isLoading) {
  document.querySelector("#quick-reminder").disabled = isLoading;
  document.querySelector("#demo-notification").disabled = isLoading;
}

function normalizePayment(row) {
  const student = row.students || {};
  const family = row.families || {};

  return {
    id: row.id,
    student: student.full_name || "Alumno sin nombre",
    parent: family.primary_phone || student.phone || "Pendiente",
    program: `${student.instrument || "Clase"} · ${student.class_type || "Sin tipo"}`,
    due: formatDueDate(row.due_date),
    amount: row.amount || 0,
    amountLabel: row.payment_label || formatMoney(row.amount),
    status: row.status || "pending",
    teacher: student.default_teacher || "Pendiente",
    days: student.days || "Pendiente",
    schedule: student.schedule || "Pendiente",
  };
}

async function loadDashboardData() {
  setLoading(true);

  const { data: paymentRows, error: paymentsError } = await supabaseClient
    .from("payments")
    .select(
      `
        id,
        concept,
        amount,
        payment_label,
        due_date,
        status,
        paid_at,
        students (
          full_name,
          phone,
          instrument,
          class_type,
          default_teacher,
          days,
          schedule
        ),
        families (
          display_name,
          primary_phone
        )
      `,
    )
    .order("created_at", { ascending: true });

  if (paymentsError) {
    showToast(`No pude cargar pagos: ${paymentsError.message}`);
    setLoading(false);
    return;
  }

  const { data: studentRows, error: studentsError } = await supabaseClient
    .from("students")
    .select("student_number, full_name, instrument, class_type, default_teacher, days, schedule")
    .eq("active", true)
    .order("student_number", { ascending: true });

  if (studentsError) {
    showToast(`No pude cargar alumnos: ${studentsError.message}`);
    setLoading(false);
    return;
  }

  payments = (paymentRows || []).map(normalizePayment);
  students = studentRows || [];
  attendance = students.slice(0, 5).map((student) => ({
    name: student.full_name,
    instrument: student.instrument || "Clase",
    status: "asistio",
  }));

  renderPrivateData();
  setLoading(false);
}

function renderKpis() {
  const paidTotal = payments
    .filter((payment) => payment.status === "paid")
    .reduce((sum, payment) => sum + moneyToNumber(payment.amount), 0);
  const pendingCount = payments.filter((payment) => payment.status === "pending").length;
  const overdueCount = payments.filter((payment) => payment.status === "overdue").length;

  const kpis = [
    { label: "Pagado este mes", value: formatMoney(paidTotal), hint: "Pagos confirmados" },
    { label: "Pendiente", value: pendingCount, hint: "Mensualidades por cobrar" },
    { label: "Vencido", value: overdueCount, hint: "Requieren recordatorio" },
    { label: "Alumnos activos", value: students.length, hint: "Base Supabase" },
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
    .map((payment, index) => {
      const isPaid = payment.status === "paid";

      return `
        <tr>
          <td class="student-cell">
            <strong>${payment.student}</strong>
            <span>${payment.program}</span>
          </td>
          <td>${payment.parent}</td>
          <td>${payment.program}</td>
          <td>${payment.due}</td>
          <td><strong>${payment.amountLabel}</strong></td>
          <td>
            <div class="status-actions">
              <span class="status-chip ${statusClasses[payment.status]}">${statusLabels[payment.status]}</span>
            </div>
          </td>
          <td>
            <div class="row-actions">
              <button class="row-button reminder-button" ${isPaid ? "disabled" : ""} data-student="${payment.student}" type="button">
                Recordar
              </button>
              <button class="row-button pay-button" ${isPaid ? "disabled" : ""} data-index="${index}" type="button">
                Pagado
              </button>
            </div>
          </td>
        </tr>
      `;
    })
    .join("");
}

function renderAgenda() {
  const agendaItems = students
    .filter((student) => student.default_teacher && student.schedule && student.schedule !== "Variable")
    .slice(0, 5)
    .map((student) => ({
      time: student.schedule,
      title: `${student.class_type || "Clase"} · ${student.instrument || "Instrumento"}`,
      meta: `${student.default_teacher} · ${student.full_name} · ${student.days}`,
    }));

  document.querySelector("#agenda-list").innerHTML = agendaItems
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
  const pending = payments.filter((payment) => payment.status !== "paid").length;
  const messages = [
    {
      from: "Supabase",
      text: `${students.length} alumnos activos cargados desde la base real.`,
    },
    {
      from: "Administración",
      text: `${pending} pagos requieren seguimiento.`,
    },
    {
      from: "Sistema Harmony",
      text: "El botón Pagado ya actualiza la base de datos.",
    },
  ];

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
  const missingPhone = payments.filter((payment) => payment.parent === "Pendiente").length;
  const tasks = [
    {
      title: "Base real conectada",
      text: "Pagos y alumnos ya salen de Supabase.",
    },
    {
      title: `${missingPhone} teléfono pendiente`,
      text: "Revisar alumnos o tutores sin teléfono confirmado.",
    },
    {
      title: "Siguiente mejora",
      text: "Crear cuentas por maestro y familia.",
    },
  ];

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
  const pendingPayment = payments.find((payment) => payment.status !== "paid");
  const message = pendingPayment
    ? `Harmony: ${pendingPayment.student} tiene un pago pendiente de ${pendingPayment.amountLabel}.`
    : "Harmony: no hay pagos pendientes.";

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

async function markPaymentPaid(index) {
  const payment = payments[index];
  if (!payment) return;

  const { error } = await supabaseClient
    .from("payments")
    .update({
      status: "paid",
      paid_at: new Date().toISOString(),
      paid_method: "admin",
    })
    .eq("id", payment.id);

  if (error) {
    showToast(`No se pudo guardar: ${error.message}`);
    return;
  }

  payment.status = "paid";
  renderKpis();
  renderPayments();
  renderMessages();
  showToast(`${payment.student} marcado como pagado en Supabase.`);
}

function attachEvents() {
  document.querySelector("#login-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.querySelector("#login-user").value.trim();
    const password = document.querySelector("#login-password").value;
    const error = document.querySelector("#login-error");

    error.textContent = "";
    const { error: authError } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      error.textContent = "Usuario o contraseña incorrectos.";
      return;
    }

    unlockApp();
    await loadDashboardData();
    showToast("Sesión iniciada.");
  });

  document.querySelector("#logout-button").addEventListener("click", async () => {
    await supabaseClient.auth.signOut();
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

    const payButton = event.target.closest(".pay-button");
    if (payButton && !payButton.disabled) {
      markPaymentPaid(Number(payButton.dataset.index));
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
    const count = payments.filter((payment) => payment.status !== "paid").length;
    showToast(`${count} recordatorios preparados para papás con pago pendiente.`);
  });

  document.querySelector("#demo-notification").addEventListener("click", showDemoNotification);

  document.querySelector("#save-attendance").addEventListener("click", () => {
    showToast("Asistencia lista para conectar a Supabase en el siguiente paso.");
  });
}

function unlockApp() {
  document.querySelector("#login-screen").classList.add("is-hidden");
  document.querySelector("#app-shell").classList.remove("is-locked");
  document.querySelector("#app-shell").setAttribute("aria-hidden", "false");
}

function renderPrivateData() {
  renderKpis();
  renderPayments();
  renderAgenda();
  renderMessages();
  renderTasks();
  renderAttendance();
  hasRenderedPrivateData = true;
}

function lockApp() {
  payments = [];
  students = [];
  attendance = [];
  hasRenderedPrivateData = false;
  document.querySelector("#login-screen").classList.remove("is-hidden");
  document.querySelector("#app-shell").classList.add("is-locked");
  document.querySelector("#app-shell").setAttribute("aria-hidden", "true");
  document.querySelector("#login-password").value = "";
  document.querySelector("#login-user").focus();
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    navigator.serviceWorker.register("sw.js").catch(() => {
      showToast("La app funciona; el modo instalable se activará al publicarla.");
    });
  }
}

async function initApp() {
  attachEvents();
  registerServiceWorker();

  const {
    data: { session },
  } = await supabaseClient.auth.getSession();

  if (session) {
    unlockApp();
    await loadDashboardData();
  } else {
    lockApp();
  }
}

initApp();
