import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Clock, Package, Check } from 'react-icons/fa';

const baseHourlyRateEUR = 50;
const baseHourlyRateTRY = 1750;

const packagePrices = {
  daily: { eur: 299, try: 299 * 35 },
  weekly: { eur: 990, try: 990 * 35 },
  monthly: { eur: 3400, try: 3400 * 35 }
};

const calculateSavings = (hours, priceEUR) => {
  const fullPrice = hours * baseHourlyRateEUR;
  return Math.round(((fullPrice - priceEUR) / fullPrice) * 100);
};

const PricingPage = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language.split('-')[0];

  const pricingTiers = [
    { duration: "10", priceEUR: 0, priceTRY: 0, description: "discovery" },
    { duration: "15", priceEUR: 10, priceTRY: 350, description: "quick" },
    { duration: "20", priceEUR: 15, priceTRY: 525, description: "focused" },
    { duration: "30", priceEUR: 25, priceTRY: 875, description: "standard" },
    { duration: "45", priceEUR: 37.50, priceTRY: 1315, description: "extended" },
    { duration: "60", priceEUR: 50, priceTRY: 1750, description: "complete" }
  ];

  const supportPackages = [
    {
      type: "daily",
      hours: 8,
      priceEUR: packagePrices.daily.eur,
      priceTRY: packagePrices.daily.try,
      savings: calculateSavings(8, packagePrices.daily.eur)
    },
    {
      type: "weekly",
      hours: 30,
      priceEUR: packagePrices.weekly.eur,
      priceTRY: packagePrices.weekly.try,
      savings: calculateSavings(30, packagePrices.weekly.eur)
    },
    {
      type: "monthly",
      hours: 120,
      priceEUR: packagePrices.monthly.eur,
      priceTRY: packagePrices.monthly.try,
      savings: calculateSavings(120, packagePrices.monthly.eur)
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {t('pricing.title')}
        </h1>
        <p className="text-lg text-gray-600">
          {t('pricing.subtitle')}
        </p>
      </motion.div>

      {/* Consultation Sessions */}
      <div className="mb-16">
        <div className="flex items-center gap-2 mb-6">
          <Clock className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">
            {t('pricing.consultationTitle')}
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.duration}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {tier.duration} {t('pricing.minutes')}
                </h3>
                <div className="mt-2">
                  <span className="text-3xl font-bold">
                    {tier.priceEUR > 0 ? `€${tier.priceEUR}` : t('pricing.free')}
                  </span>
                  <span className="text-gray-500 ml-2">
                    / {t('pricing.session')}
                  </span>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {tier.priceTRY > 0 ? `₺${tier.priceTRY}` : t('pricing.free')}
                </div>
              </div>
              <p className="text-gray-600 text-center mb-4">
                {t(`pricing.${tier.description}`)}
              </p>
              <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                {t('pricing.bookNow')}
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Support Packages */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <Package className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">
            {t('pricing.supportPackagesTitle')}
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {supportPackages.map((pkg, index) => (
            <motion.div
              key={pkg.type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {t(`pricing.${pkg.type}Support`)}
                </h3>
                <div className="mt-2">
                  <span className="text-3xl font-bold">
                    €{pkg.priceEUR}
                  </span>
                  <span className="text-gray-500 ml-2">
                    / {t(`pricing.${pkg.type}`)}
                  </span>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  ₺{pkg.priceTRY}
                </div>
              </div>
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>{pkg.hours} {t('pricing.hoursIncluded')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>{pkg.savings}% {t('pricing.savings')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>{t(`pricing.${pkg.type}Features`)}</span>
                </div>
              </div>
              <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                {t('pricing.contactUs')}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
