import type { CancellationProtection } from "./CancellationProtection";
import type { AutoCheckIn } from "./AutoCheckIn";

export interface Cart {
  cancellationProtection?: CancellationProtection;
  autoCheckIn?: AutoCheckIn;
}
