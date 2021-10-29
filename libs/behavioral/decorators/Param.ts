import { Step } from '../models/Step';
import { StepArgument } from './Step';

export interface Dictionary<T = any> {
  [key: string]: T;
}

export interface ParamConfig {
  dict?: Dictionary;
}

export const Param = (name: string, config?: ParamConfig): ParameterDecorator => StepArgument((step: Step) => {  
  return config?.dict ? config.dict[step.params[name]] : step.params[name];
});
