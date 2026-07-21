export const otherWaterWorkspaceKey = "otherwater";

export const activeWorkspace = process.env.NEXT_PUBLIC_OVOPS_WORKSPACE ?? "";

export const isOtherWaterWorkspaceBuild = activeWorkspace === otherWaterWorkspaceKey;

export const otherWaterWorkspaceUrl = "https://otherwater.ovops.com";
