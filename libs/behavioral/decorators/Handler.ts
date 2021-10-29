export interface HandlerOptions {
  groups: any[]
}

export const Handler = (options?: HandlerOptions): ClassDecorator => (target: any) => {
  target.parameters = target.parameters ? target.parameters : {};

  target.parameters.groups = options?.groups ?? [];
}
