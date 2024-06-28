interface PluginEnterPayload {
  code: string;
  payload: string;
}

type OnPluginEnterCallback = (payload: PluginEnterPayload) => void;

interface UTools {
  onPluginEnter: (callback: OnPluginEnterCallback) => void;
}

declare global {
  interface Window {
    utools?: UTools;
  }
}

export type { UTools, OnPluginEnterCallback, PluginEnterPayload };
