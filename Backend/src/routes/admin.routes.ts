import { Router } from "express";
import * as adminController from "../controller/admin.controller";
import * as authController from "../controller/auth.controller";
import { protect, restrictTo } from "../middleware/auth.middleware";
import * as designSubmissionController from "../controller/designSubmissionController";
import * as approvedDesignController from "../controller/approvedDesignController";

const router = Router();

// ADMIN AUTH
router.post("/auth/login", authController.loginAdmin);
router.get("/auth/me", protect, restrictTo("ADMIN", "SUPER_ADMIN"), authController.getMe);

// REGISTRATION REQUESTS
router.get("/registration-requests", protect, restrictTo("ADMIN", "SUPER_ADMIN"), adminController.getRegistrationRequests);
router.get("/registration-requests/:request_id", protect, restrictTo("ADMIN", "SUPER_ADMIN"), adminController.getRegistrationRequestById);
router.post("/registration-requests/:request_id/approve", protect, restrictTo("ADMIN", "SUPER_ADMIN"), adminController.approveRegistrationRequest);
router.patch("/registration-requests/:request_id/reject", protect, restrictTo("ADMIN", "SUPER_ADMIN"), adminController.rejectRegistrationRequest);
router.patch("/registration-requests/:request_id/credentials-sent", protect, restrictTo("ADMIN", "SUPER_ADMIN"), adminController.markCredentialsSent);

// CLIENTS
router.get("/clients", protect, restrictTo("ADMIN", "SUPER_ADMIN"), adminController.getClients);
router.get("/clients/:id", protect, restrictTo("ADMIN", "SUPER_ADMIN"), adminController.getClientById);

// DESIGN SUBMISSIONS
router.get("/design-submissions", protect, restrictTo("ADMIN", "SUPER_ADMIN"), designSubmissionController.getAdminSubmissions);
router.get("/design-submissions/:submissionId", protect, restrictTo("ADMIN", "SUPER_ADMIN"), designSubmissionController.getAdminSubmissionById);
router.post("/design-submissions/:submissionId/approve", protect, restrictTo("ADMIN", "SUPER_ADMIN"), designSubmissionController.approveSubmission);
router.patch("/design-submissions/:submissionId/reject", protect, restrictTo("ADMIN", "SUPER_ADMIN"), designSubmissionController.rejectSubmission);

// APPROVED DESIGNS
router.get("/designs", protect, restrictTo("ADMIN", "SUPER_ADMIN"), approvedDesignController.getAdminDesigns);
router.get("/designs/:designId", protect, restrictTo("ADMIN", "SUPER_ADMIN"), approvedDesignController.getAdminDesignById);
router.patch("/designs/:designId/archive", protect, restrictTo("ADMIN", "SUPER_ADMIN"), approvedDesignController.archiveDesign);

export default router;