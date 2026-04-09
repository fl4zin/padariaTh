(function () {
  const data = window.PORTFOLIO_DATA;

  if (!data || !data.personal) {
    throw new Error("Arquivo portfolio-data.js nao encontrado ou incompleto.");
  }

  const byId = (id) => document.getElementById(id);

  const setText = (id, value) => {
    const el = byId(id);
    if (el) {
      el.textContent = value || "";
    }
  };

  const setLink = (id, label, href) => {
    const el = byId(id);
    if (!el) return;
    el.textContent = label || "";
    el.href = href || "#";
  };

  const safeList = (value) => (Array.isArray(value) ? value : []);

  setText("hero-role", data.personal.role);
  setText("hero-title", data.personal.name);
  setText("hero-description", data.personal.headline);
  setText("profile-name", data.personal.name);
  setText("profile-location", data.personal.location);
  setText("about-text", data.about);
  setText("contact-message", data.contactMessage);
  setText("footer-name", data.personal.name + " - ");
  setText("footer-year", new Date().getFullYear());

  const image = byId("profile-image");
  if (image) {
    image.src = data.personal.profileImage || "";
    image.loading = "lazy";
    image.referrerPolicy = "no-referrer";
    image.onerror = function () {
      image.alt = "Imagem de perfil indisponivel";
      image.removeAttribute("src");
    };
  }

  setLink("contact-email", data.personal.email, "mailto:" + (data.personal.email || ""));

  const socialContainer = byId("social-links");
  if (socialContainer) {
    socialContainer.innerHTML = "";
    safeList(data.social).forEach((item) => {
      const a = document.createElement("a");
      a.href = item.url || "#";
      a.target = "_blank";
      a.rel = "noreferrer";
      a.textContent = item.label || "Link";
      socialContainer.appendChild(a);
    });
  }

  const highlightList = byId("highlight-list");
  if (highlightList) {
    highlightList.innerHTML = "";
    safeList(data.highlights).forEach((item) => {
      const li = document.createElement("li");
      li.className = "highlight-item";
      li.innerHTML = "<strong></strong><span></span>";
      li.querySelector("strong").textContent = item.value || "0";
      li.querySelector("span").textContent = item.label || "";
      highlightList.appendChild(li);
    });
  }

  const skillGrid = byId("skill-grid");
  if (skillGrid) {
    skillGrid.innerHTML = "";
    safeList(data.skills).forEach((item) => {
      const card = document.createElement("article");
      card.className = "skill-card";
      card.innerHTML = "<h3></h3><p></p>";
      card.querySelector("h3").textContent = item.title || "Skill";
      card.querySelector("p").textContent = item.description || "";
      skillGrid.appendChild(card);
    });
  }

  const projectGrid = byId("project-grid");
  if (projectGrid) {
    projectGrid.innerHTML = "";
    safeList(data.projects).forEach((item) => {
      const article = document.createElement("article");
      article.className = "project-card";

      const imageEl = document.createElement("img");
      imageEl.src = item.image || "";
      imageEl.alt = "Preview do projeto " + (item.title || "");
      imageEl.loading = "lazy";
      imageEl.referrerPolicy = "no-referrer";

      const title = document.createElement("h3");
      title.textContent = item.title || "Projeto";

      const description = document.createElement("p");
      description.textContent = item.description || "";

      const tagList = document.createElement("div");
      tagList.className = "tag-list";
      safeList(item.tags).forEach((tag) => {
        const span = document.createElement("span");
        span.className = "tag";
        span.textContent = tag;
        tagList.appendChild(span);
      });

      const link = document.createElement("a");
      link.className = "project-link";
      link.textContent = "Abrir projeto";
      link.href = item.url || "#";
      link.target = "_blank";
      link.rel = "noreferrer";

      article.appendChild(imageEl);
      article.appendChild(title);
      article.appendChild(description);
      article.appendChild(tagList);
      article.appendChild(link);

      projectGrid.appendChild(article);
    });
  }

  const resumeUrl = data.personal.resumeUrl || "#";
  const ctaProjects = byId("cta-projects");
  if (ctaProjects && resumeUrl !== "#") {
    ctaProjects.textContent = "Baixar CV";
    ctaProjects.href = resumeUrl;
    ctaProjects.target = "_blank";
    ctaProjects.rel = "noreferrer";
  }
})();
