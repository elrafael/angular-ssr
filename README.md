# Angular SSR Portfolio Architecture

[![Quality Check](https://github.com/elrafael/angular-ssr/actions/workflows/quality.yml/badge.svg)](https://github.com/elrafael/angular-ssr/actions/workflows/quality.yml)
[![Build & Push Image](https://github.com/elrafael/angular-ssr/actions/workflows/build.yml/badge.svg)](https://github.com/elrafael/angular-ssr/actions/workflows/build.yml)

**Live Demo:** [angular-ssr.elrafael.net](https://angular-ssr.elrafael.net)

## 🚀 Overview

This repository serves as a **Technical Proof of Concept (PoC)** for a modern, high-performance web architecture. It leverages the latest features of **Angular (v21+)** combined with a robust **GitOps** pipeline.

The goal is to demonstrate a production-ready environment focusing on **SEO (SSR)**, **Reactive Performance (Signals)**, and **Automated Infrastructure (Docker/GitHub Actions)**.

## 🛠 Tech Stack & Architecture

### Frontend

- **Angular 21:** Utilizing standalone components and the new **Signals** API for granular reactivity.
- **SSR (Server-Side Rendering):** Optimized for SEO and First Contentful Paint (FCP).
- **Zoneless Oriented:** Prepared for the future of Angular by reducing Zone.js overhead.
- **Testing:** Unit testing with **Vitest** and E2E testing with **Playwright**.

### DevOps & Infrastructure (GitOps)

- **CI/CD:** Orchestrated via **GitHub Actions** with dedicated workflows for:
  - **Quality Gate:** Automated linting and unit testing with coverage reports.
  - **Docker Orchestration:** Multi-stage builds for optimized image sizes (Node 24-alpine).
  - **Automated Deployment:** Continuous Deployment to a **Hetzner VPS** via SSH and Docker Compose.
- **Reverse Proxy:** Managed by **Traefik** with automatic Let's Encrypt SSL certificates.
- **Registry:** Images hosted on **GitHub Container Registry (GHCR)**.

## 📦 Local Development

1. **Install dependencies:**

   ```bash
   npm ci
   ```

2. **Run development server:**

   ```bash
   npm start
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## 🧪Testing

- **Unit Tests (Vitest):**

  ```bash
   npm run test
  ```

- **E2E Tests (Playwright):**

  ```bash
  npm run test:e2e
  ```

- **Coverage:**
  ```bash
  npm run test:ci
  ```

## ⚙️ Backend & Data Orchestration (BFF)

- **Node.js & Express:** Integrated BFF (Backend-for-Frontend) layer within the SSR engine.

- **Data Enrichment:** Demonstrates server-side orchestration by combining multiple external APIs (e.g., JSONPlaceholder) to deliver enriched data models directly to the frontend.

- **Performance:** Reduces client-side processing and multiple round-trips by handling complex data transformations and parallel fetching (Promise.all) on the server.

- **REST API Endpoints:** Custom endpoints (/api/todos, /api/albums) designed to feed the Angular application with pre-processed, clean data
