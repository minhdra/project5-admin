import Joi from 'joi';

export function loginValidator(data) {
  const rule = Joi.object({
    ...data,
    username: Joi.string().min(1).max(24).required(),
    password: Joi.string().min(1).max(24).required(),
  }).messages({
    'string.empty': `Không được để trống.`,
    'date.base': `Không đúng định dạng`,
    'number.base': `Không đúng định dạng`,
  });

  return rule.validate(data, { abortEarly: false });
}

export const registerValidator = (data) => {
  const rule = Joi.object({
    ...data,
    username: Joi.string()
      .regex(/^(?:[A-Z\d][A-Z\d_-]{5,10})$/i)
      .required()
      .messages({
        'string.pattern.base':
          'Tài khoản phải có độ dài 5-10 và không có ký tự đặc biệt.',
      }),
    email: Joi.string()
      .regex(/^([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4})$/i)
      .required()
      .messages({
        'string.pattern.base': 'Không đúng định dạng email.',
      }),
    password: Joi.string()
      .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,12}$/i)
      .required()
      .messages({
        'string.pattern.base':
          'Mật khẩu phải có độ dài 6-12, gồm cả ký tự, số và ký tự đặc biệt.',
      }),
  }).messages({
    'string.empty': 'Không thể để trống',
    'any.required': 'Không thể để trống',
  });

  return rule.validate(data, { abortEarly: false });
};

export function modalUserValidator(data) {
  const rule = Joi.object({
    ...data,
    email: Joi.string().email({ tlds: { allow: false } }),
    first_name: Joi.string().max(24).label('first name').required(),
    last_name: Joi.string().max(24).label('last name').required(),
    phone: Joi.string().pattern(new RegExp('^[0-9]{10,11}$')).optional(),
    birth: Joi.date().optional(),
  }).messages({
    'string.empty': `Không được để trống.`,
    'date.base': `Không đúng định dạng`,
    'number.base': `Không đúng định dạng`,
  });

  return rule.validate(data, { abortEarly: false });
}

export function modalCustomerValidator(data) {
  const rule = Joi.object({
    ...data,
    email: Joi.string().email({ tlds: { allow: false } }),
    first_name: Joi.string().max(24).label('first name').required(),
    last_name: Joi.string().max(24).label('last name').required(),
    phone: Joi.string().pattern(new RegExp('^[0-9]{10,11}$')).optional(),
    birth: Joi.date().optional(),
    carts: Joi.array().optional().empty(Joi.array().length(0)),
    delivery_addresses: Joi.array().optional().empty(Joi.array().length(0)),
  }).messages({
    'string.empty': `Không được để trống.`,
    'date.base': `Không đúng định dạng`,
    'number.base': `Không đúng định dạng`,
  });

  return rule.validate(data, { abortEarly: false });
}

export function modalProductValidator(data) {
  const rule = Joi.object({
    ...data,
    product_name: Joi.string().max(100).label('name').required(),
    path: Joi.string().max(100).required(),
    category: Joi.number().label('danh mục lớn').required(),
    category_sub: Joi.number().label('danh mục nhỏ'),
    brand: Joi.number(),
    origin: Joi.string().max(100).required(),
    material: Joi.string().max(100).required(),
    style: Joi.string().max(100).required(),
    thumbnail: Joi.string().required(),
    description: Joi.string().required(),
    variants: Joi.array().optional().empty(Joi.array().length(0)),
  }).messages({
    'string.empty': `Không được để trống.`,
    'date.base': `Không đúng định dạng`,
    'number.base': `Không đúng định dạng`,
    'any.required': `Không được để trống.`,
  });

  return rule.validate(data, { abortEarly: false });
}

export function modalProductVariantValidator(data) {
  const rule = Joi.object({
    ...data,
    color: Joi.string().max(100).label('Color').required(),
    hex: Joi.string().max(100).label('Hex').required(),
    invoice_price: Joi.string().label('Invoice Price').required(),
    sell_price: Joi.string().label('Sell Price').required(),
    images: Joi.array().required().empty(Joi.array().length(0)),
    list_sizes: Joi.array().required().empty(Joi.array().length(0)),
  }).messages({
    'string.empty': `Không được để trống.`,
    'date.base': `Không đúng định dạng`,
    'number.base': `Không đúng định dạng`,
  });

  return rule.validate(data, { abortEarly: false });
}

export function modalProductVariantNoSizeValidator(data) {
  const rule = Joi.object({
    ...data,
    color: Joi.string().max(100).label('Color').required(),
    hex: Joi.string().max(100).label('Hex').required(),
    invoice_price: Joi.string().label('Invoice Price').required(),
    sell_price: Joi.string().label('Sell Price').required(),
    images: Joi.array().required().empty(Joi.array().length(0)),
    quantityNoSize: Joi.string().required(),
  }).messages({
    'string.empty': `Không được để trống.`,
    'date.base': `Không đúng định dạng`,
    'number.base': `Không đúng định dạng`,
  });

  return rule.validate(data, { abortEarly: false });
}

export function modalServiceValidator(data) {
  const rule = Joi.object({
    ...data,
    thumbnail: Joi.string().required(),
    content: Joi.string().required(),
    title: Joi.string().max(100).required(),
    path: Joi.string().max(100).required(),
    summary: Joi.string().required(),
  }).messages({
    'string.empty': `Không được để trống.`,
    'date.base': `Không đúng định dạng`,
    'number.base': `Không đúng định dạng`,
  });

  return rule.validate(data, { abortEarly: false });
}

export function modalSlideValidator(data) {
  const rule = Joi.object({
    ...data,
    title: Joi.string().required(),
    backgroundImage: Joi.string().required(),
    redirectTo: Joi.string().max(100).required(),
    contentLink: Joi.string().max(100).required(),
  }).messages({
    'string.empty': `Không được để trống.`,
    'date.base': `Không đúng định dạng`,
    'number.base': `Không đúng định dạng`,
  });

  return rule.validate(data, { abortEarly: false });
}

export function modalBrandValidator(data) {
  const rule = Joi.object({
    ...data,
    brand_name: Joi.string().required(),
    thumbnail: Joi.string().required(),
    description: Joi.string().required(),
    path: Joi.string().max(100).required(),
  }).messages({
    'string.empty': `Không được để trống.`,
    'date.base': `Không đúng định dạng`,
    'number.base': `Không đúng định dạng`,
  });

  return rule.validate(data, { abortEarly: false });
}

export function modalCategoryValidator(data) {
  const rule = Joi.object({
    ...data,
    category_name: Joi.string().required(),
    description: Joi.string().required(),
    thumbnail: Joi.string().required(),
    path: Joi.string().required(),
  }).messages({
    'string.empty': `Không được để trống.`,
    'date.base': `Không đúng định dạng`,
    'number.base': `Không đúng định dạng`,
  });

  return rule.validate(data, { abortEarly: false });
}

export function modalSubCategoryValidator(data) {
  const rule = Joi.object({
    ...data,
    sub_category_name: Joi.string().label('category name').required(),
    category: Joi.number().required(),
    path: Joi.string().required(),
    description: Joi.string().required(),
  }).messages({
    'string.empty': `Không được để trống.`,
    'date.base': `Không đúng định dạng`,
    'number.base': `Không đúng định dạng`,
  });

  return rule.validate(data, { abortEarly: false });
}

export function modalSupplierValidator(data) {
  const rule = Joi.object({
    ...data,
    supplier_name: Joi.string().required(),
    address: Joi.string().required(),
    phone: Joi.string().pattern(new RegExp('^[0-9]{10,11}$')).optional(),
    email: Joi.string().email({ tlds: { allow: false } }),
    description: Joi.string().required(),
  }).messages({
    'string.empty': `Không được để trống.`,
    'date.base': `Không đúng định dạng`,
    'number.base': `Không đúng định dạng`,
  });

  return rule.validate(data, { abortEarly: false });
}

export function modalDiscountValidator(data) {
  const rule = Joi.object({
    ...data,
    // discount_name: Joi.string().required(),
    discount_percent: Joi.number().required(),
    start_date: Joi.date().required(),
    // end_date: Joi.date().required(),
  }).messages({
    'string.empty': `Không được để trống.`,
    'date.base': `Không đúng định dạng`,
    'number.base': `Không đúng định dạng`,
  });

  return rule.validate(data, { abortEarly: false });
}

export function modalCollectionValidator(data) {
  const rule = Joi.object({
    ...data,
    collect_name: Joi.string().required(),
    thumbnail: Joi.string().required(),
    description: Joi.string().required(),
    path: Joi.string().max(100).required(),
    status: Joi.boolean().required(),
  }).messages({
    'string.empty': `Không được để trống.`,
    'date.base': `Không đúng định dạng`,
    'number.base': `Không đúng định dạng`,
  });

  return rule.validate(data, { abortEarly: false });
}

export function modalInvoiceValidator(data) {
  const rule = Joi.object({
    ...data,
    staff: Joi.string().required(),
    product: Joi.number().required(),
    supplier: Joi.number().required(),
    paid: Joi.boolean().required(),
    total: Joi.string().required(),
    details: Joi.array().optional().empty(Joi.array().length(0)),
  }).messages({
    'string.empty': `Không được để trống.`,
    'date.base': `Không đúng định dạng`,
    'number.base': `Không đúng định dạng`,
  });

  return rule.validate(data, { abortEarly: false });
}

export function modalNavigationValidator(data) {
  const rule = Joi.object({
    ...data,
    title: Joi.string().required(),
    path: Joi.string().required(),
    isAdmin: Joi.boolean().required(),
    order: Joi.number().required(),
  }).messages({
    'string.empty': `Không được để trống.`,
    'date.base': `Không đúng định dạng`,
    'number.base': `Không đúng định dạng`,
  });

  return rule.validate(data, { abortEarly: false });
}