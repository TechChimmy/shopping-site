"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// seed-products.ts
var supabase_js_1 = require("@supabase/supabase-js");
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
var supabase = (0, supabase_js_1.createClient)(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY // Use service role key for full insert privileges
);
function seedProducts() {
    return __awaiter(this, void 0, void 0, function () {
        var products, _i, products_1, product, _a, data, error;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    products = [
                        {
                            name: 'Wireless Headphones',
                            description: 'High-quality wireless headphones with noise cancellation.',
                            price: 2999,
                            stock: 50,
                            category: 'Electronics',
                            image_url: 'https://images.unsplash.com/photo-1580894894513-7c2a1f5a99c1?auto=format&fit=crop&w=800&q=80',
                        },
                        {
                            name: 'Smart Watch',
                            description: 'Stay connected on the go with this sleek smart watch.',
                            price: 4999,
                            stock: 40,
                            category: 'Electronics',
                            image_url: 'https://images.unsplash.com/photo-1598970434795-0c54fe7c0642?auto=format&fit=crop&w=800&q=80',
                        },
                        {
                            name: 'Running Shoes',
                            description: 'Comfortable running shoes for daily workouts.',
                            price: 1999,
                            stock: 60,
                            category: 'Footwear',
                            image_url: 'https://images.unsplash.com/photo-1612810806211-1c7e5a8a9b15?auto=format&fit=crop&w=800&q=80',
                        },
                        {
                            name: 'Leather Backpack',
                            description: 'Stylish leather backpack for work and travel.',
                            price: 3499,
                            stock: 30,
                            category: 'Accessories',
                            image_url: 'https://images.unsplash.com/photo-1598300055654-6d0ecb41625e?auto=format&fit=crop&w=800&q=80',
                        },
                        {
                            name: 'Coffee Mug Set',
                            description: 'Set of 4 ceramic coffee mugs, perfect for your kitchen.',
                            price: 799,
                            stock: 100,
                            category: 'Home & Kitchen',
                            image_url: 'https://images.unsplash.com/photo-1612831455544-6d9c9d13c111?auto=format&fit=crop&w=800&q=80',
                        },
                    ];
                    _i = 0, products_1 = products;
                    _b.label = 1;
                case 1:
                    if (!(_i < products_1.length)) return [3 /*break*/, 4];
                    product = products_1[_i];
                    return [4 /*yield*/, supabase.from('products').insert(product)];
                case 2:
                    _a = _b.sent(), data = _a.data, error = _a.error;
                    if (error) {
                        console.error('Error inserting product:', product.name, error.message);
                    }
                    else {
                        console.log('Inserted product:', product.name);
                    }
                    _b.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    console.log('Seeding complete!');
                    return [2 /*return*/];
            }
        });
    });
}
seedProducts();
