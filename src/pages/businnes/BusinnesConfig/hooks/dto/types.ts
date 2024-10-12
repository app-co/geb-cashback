import { z } from 'zod';

import { formRegisterCompnay, formRegisterSocialMida } from './shema';

export type TFormRegisterCompany = z.infer<typeof formRegisterCompnay>;
export type TFormRegisterSocialMidate = z.infer<typeof formRegisterSocialMida>;
