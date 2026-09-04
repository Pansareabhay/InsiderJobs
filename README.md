# InsiderJobs

Job portal UI built from the [Figma Job Portal design](https://www.figma.com/design/D6tXxRWuiZho7Mj3LdZ6cF/Job-Portal-Design-File?node-id=20416-2&t=XzJpJqYSWC1SqyL7-0) using the icons and logos in `src/assets/`.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Pages

- `/` — Home, search, filters, job cards
- `/apply-job/:id` — Job details
- `/applications` — Resume + jobs applied
- Recruiter Login modal → `/dashboard/manage-jobs`
- `/dashboard/add-job` — Post a job
- `/dashboard/view-applications` — Accept / reject applicants

**Register** creates a demo job-seeker session. **Recruiter Login** opens the company dashboard (frontend demo, no backend).
