export type NotificationLevel = "Info" | "Warn" | "Error"
export type NotificationAction =
  | {
      text: string
      func: () => void
    }
  | undefined
