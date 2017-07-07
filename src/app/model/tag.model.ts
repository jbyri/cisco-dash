/**
 * Represents the category for a customer datapoint
 */
export interface Tag {
  /**
   * The fully readable name
   */
  name: string;

  /**
   * the label displayed in the Tag UI (when displayed as a UI element standalone)
   */
  label: string;

  /**
   * -The tag id (unique)
   */
  id: number;
}
