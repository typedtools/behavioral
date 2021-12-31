export const Context = (): ClassDecorator => (target: any) => {
  target.parameters = target.parameters ? target.parameters : {};
}
