// This file stores large project descriptions to keep index.html clean and maintainable.
const projectDescriptions = {
  rexFintechApp:
    "Cross-platform fintech app for Rex Microfinance Bank using Flutter, and deployed to Google Play Store and Apple App Store. The app serves as a full-featured digital banking platform supporting both individual and business account types, with capabilities including account onboarding with KYC/BVN verification and facial liveness detection (QoreID), fund transfers, bill payments (airtime, data, cable TV, electricity), savings products (regular, target, and fixed deposits), and real-time push notifications via Firebase. The architecture follows a clean modular structure using Riverpod for state management, Dio for networking, GoRouter for navigation, and Hive for local caching — with Codemagic CI/CD pipelines for automated builds, and Mixpanel and Firebase Analytics for user behavior tracking and crash reporting.",

  rexPosApp:
    "Production Flutter app for Rex MFB that runs exclusively on Android POS terminal devices and is distributed through the device manufacturer's proprietary app store. The app enables merchants to process card-based purchases, pay-with-transfer transactions, and bank transfers directly from the POS terminal. It integrates with the on-device Global Accelerex PSTP app to handle NIBSS transactions, card validation, and printing. It also includes features such as real-time transaction notifications over websockets, end-of-day report generation and printing, transaction dispute management, offline-first transaction persistence with SQLite, encrypted local storage using Hive with AES encryption, error monitoring through Sentry, and an auto-logout inactivity timer for device security. The architecture follows a clean modular structure using Riverpod for state management, Dio for networking, and GoRouter for navigation.",

  teaJavaApp:
    "Blog REST API using Java 21 and Spring Boot 3, hosted on Railway. The application is architected with a clean, modular, layered structure and features stateless JWT-based authentication, role-based access control via Spring Security, and robust SMTP-driven email OTP verification to ensure secure user onboarding. Under the hood, it leverages Spring Data JPA and PostgreSQL for data persistence, integrates Flyway for version-controlled database migrations, and set up interactive API documentation using Swagger UI. To streamline cloud delivery, it uses a highly optimized multi-stage Docker pipeline utilizing Spring Boot's layertools to separate dependencies and ensure rapid container builds on Railway's CI/CD infrastructure.",

  skyJavaApp:
    "Full-stack weather forecast application using Java 17 and Spring Boot 3, deployed to Railway. The app lets users search for any city worldwide and view real-time weather conditions along with multi-day forecasts, powered by the OpenWeatherMap Geocoding and Weather APIs. On the backend, it features an MVC architecture with separate controller, service, and repository layers, backed by a PostgreSQL database with schema versioning handled by Flyway. It implements Caffeine-based caching with tiered TTLs to minimize redundant API calls, and a scheduled background service that automatically refreshes weather data for the most frequently searched cities. The app features both a server-side rendered web UI built with Thymeleaf and Bootstrap, as well as a fully documented REST API with Swagger UI via Springdoc OpenAPI. The app is containerized using a multi-stage Docker build.",

  rexBaasCore:
    "Robust, enterprise-grade financial middleware and API platform that serves as the central engine for Rex MFB. Developed using Java and Spring Boot, the platform orchestrates high-throughput financial workflows between client channels—including mobile apps, web portals, POS terminals, and external partners—and the core banking system (Apache Fineract/Mifos). It implements a highly modular architecture containing over 50 business modules, including automated digital KYC onboarding (BVN/NIN verification), a complete card management lifecycle (physical and virtual card tracking for Verve, Visa, and Mastercard), and instant interbank money transfers (via NIBSS NIP and Wema Bank). To ensure compliance and scalability, I integrated advanced security protocols (BouncyCastle PGP, AES-128 payload encryption, Google Authenticator TOTP), Redis caching, ShedLock for distributed task scheduling, and AWS services (S3, SQS FIFO queues, SES, and Amazon Rekognition for facial biometric verification).",
};

// Tech stacks shown as chips under each project
const projectTechStacks = {
  rexFintechApp: [
    "Flutter",
    "Dart",
    "Firebase",
    "Riverpod",
    "Codemagic",
    "Mixpanel",
  ],
  rexPosApp: [
    "Flutter",
    "Android",
    "SQLite",
    "Riverpod",
    "Sentry",
    "WebSocket",
  ],
  teaJavaApp: [
    "Java 21",
    "Spring Boot",
    "PostgreSQL",
    "Docker",
    "JWT",
    "Flyway",
  ],
  skyJavaApp: [
    "Java 17",
    "Spring Boot",
    "PostgreSQL",
    "Thymeleaf",
    "Docker",
    "Caffeine",
  ],
  rexBaasCore: [
    "Java",
    "Spring Boot",
    "Redis",
    "AWS",
    "Fineract",
    "Docker",
  ],
};

// Project type labels
const projectTypes = {
  rexFintechApp: "Mobile",
  rexPosApp: "Mobile",
  teaJavaApp: "Backend",
  skyJavaApp: "Full-Stack",
  rexBaasCore: "Backend",
};

// Map DOM element IDs to description keys
const descriptionMap = {
  "rex-project-desc": "rexFintechApp",
  "rex-pos-project-desc": "rexPosApp",
  "tea-project-desc": "teaJavaApp",
  "sky-project-desc": "skyJavaApp",
  "rex-baas-core-desc": "rexBaasCore",
};

// Inject descriptions, tech chips, type badges, and set up expand/collapse toggles
document.addEventListener("DOMContentLoaded", () => {
  // Populate project descriptions, tech chips, and type badges
  Object.entries(descriptionMap).forEach(([elementId, descKey]) => {
    const el = document.getElementById(elementId);
    if (!el) return;

    // Set description text
    if (projectDescriptions[descKey]) {
      el.textContent = projectDescriptions[descKey];
    }

    // Add type badge to the project header
    const projectItem = el.closest(".project-item");
    if (projectItem && projectTypes[descKey]) {
      const head = projectItem.querySelector(".project-head");
      if (head) {
        const badge = document.createElement("span");
        badge.className = "project-type-badge";
        badge.textContent = projectTypes[descKey];
        head.appendChild(badge);
      }
    }

    // Add tech stack chips after the description
    if (projectItem && projectTechStacks[descKey]) {
      const chipsContainer = document.createElement("div");
      chipsContainer.className = "project-tech-chips";
      projectTechStacks[descKey].forEach((tech) => {
        const chip = document.createElement("span");
        chip.className = "tech-chip";
        chip.textContent = tech;
        chipsContainer.appendChild(chip);
      });
      // Insert after the description (or after the read-more button if present)
      el.parentElement.insertBefore(chipsContainer, el.nextSibling);
    }
  });

  // Add "Read more" toggles to truncated descriptions
  requestAnimationFrame(() => {
    document.querySelectorAll(".project-desc").forEach((desc) => {
      if (desc.scrollHeight > desc.clientHeight) {
        const btn = document.createElement("button");
        btn.className = "read-more-btn";
        btn.textContent = "Read more";
        btn.addEventListener("click", () => {
          const isExpanded = desc.classList.toggle("expanded");
          btn.textContent = isExpanded ? "Show less" : "Read more";
        });
        // Insert right after the description, before tech chips
        desc.parentElement.insertBefore(btn, desc.nextSibling);
      }
    });
  });
});
