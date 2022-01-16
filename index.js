const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');

const Joi = require('joi');

const salaryDetails = require('./functions');

(async() => {
    const server = await new Hapi.Server({
        host: 'localhost',
        port: 3000,
    });

    const swaggerOptions = {
        info: {
            title: 'Salary Expectations Details API Documentation',
            version: Pack.version,
        },
    };

    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    try {
        await server.start();
        console.log('Server running at:', server.info.uri);
    } catch (err) {
        console.log(err);
    }

    // server.route(Routes);


    server.route({
        method: 'POST',
        path: '/salary',
        options: {
            description: 'Calculate Salary Expectation',
            notes: 'Salary Details',
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    basicSalary: Joi.number().required(),
                    totalAllowance: Joi.number().required()
                })
            },
            handler: (request, h) => {

                let basicSalary = request.payload.basicSalary;
                console.log("basicSalary: " + basicSalary);

                let totalAllowance = request.payload.totalAllowance;
                console.log("totalAllowance: " + totalAllowance);



                let totalEmployeePensionContribution = salaryDetails.getTotalEmployeePensionContributionForTier123(basicSalary, 0.00, 0.055, 0.05);
                console.log("totalEmployeePensionContribution: " + totalEmployeePensionContribution);

                let totalEmployerPension = salaryDetails.getTotalEmployeePensionContributionForTier123(basicSalary, 0.13, 0.00, 0.05);
                console.log("totalEmployerPension: " + totalEmployerPension);


                let totalGrossSalary = salaryDetails.getGrossSalary(basicSalary, totalAllowance, totalEmployerPension, 0.00);
                console.log("totalGrossSalary: " + totalGrossSalary);

                let newBasicSalary = salaryDetails.getNewBasicSalary(basicSalary, totalEmployeePensionContribution);
                console.log("newBasicSalary: " + newBasicSalary);

                let TaxableIncome = newBasicSalary + totalAllowance;
                console.log("TaxableIncome: " + TaxableIncome);

                let taxRate = salaryDetails.getTaxRateFromTaxableIncome(TaxableIncome);
                // let taxRate = salaryDetails.getTaxRateFromTaxableIncome(2790.0);
                console.log("taxRate: " + taxRate);

                let taxAmount = salaryDetails.getTaxAmount(taxRate, TaxableIncome);
                console.log("taxAmount: " + taxAmount);

                let netSalary = salaryDetails.getNetSalaryAmount(taxAmount, TaxableIncome);
                console.log("netSalary: " + netSalary);

                return {
                    "EPC": totalEmployeePensionContribution.toFixed(2),
                    "EP": totalEmployerPension.toFixed(2),
                    "PAYE": taxAmount.toFixed(2),
                    "NetSalary": netSalary.toFixed(2),
                    "GrossSalary": totalGrossSalary.toFixed(2)
                };

                return request.payload;
            }

        }

    });

})();