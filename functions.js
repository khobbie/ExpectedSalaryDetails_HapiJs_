/*
    Custom Functions
 */

// ** Employee Pension ** //
function getEmployeePension(BasicSalaryAmount, EmployeePensionRate) {
    return EmployeePensionRate * BasicSalaryAmount;
}

// ** Employer Pension ** //
function getEmployerPension(BasicSalaryAmount, EmployerPensionRate) {
    return EmployerPensionRate * BasicSalaryAmount;
}



function getTotalEmployeePensionContributionForTier123(basicSalary, tierOnePensionRate, tierTwoPensionRate, tierThreePensionRate) {

    let tierOnePensionAmount = getEmployeePension(basicSalary, tierOnePensionRate);

    let tierTwoPensionAmount = getEmployeePension(basicSalary, tierTwoPensionRate);

    let tierThreePensionAmount = getEmployeePension(basicSalary, tierThreePensionRate);

    return tierOnePensionAmount + tierTwoPensionAmount + tierThreePensionAmount;

}



function getTotalEmployerPensionContributionForTier123(basicSalary, tierOnePensionRate, tierTwoPensionRate, tierThreePensionRate) {


    let tierOnePensionAmount = getEmployerPension(basicSalary, tierOnePensionRate);

    let tierTwoPensionAmount = getEmployerPension(basicSalary, tierTwoPensionRate);

    let tierThreePensionAmount = getEmployerPension(basicSalary, tierThreePensionRate);

    return tierOnePensionAmount + tierTwoPensionAmount + tierThreePensionAmount;

}



// ** Tax Rate ** //
function getTaxRateFromTaxableIncome(TaxableIncome) {


    let taxRate = 0.00;

    if (TaxableIncome <= 280) {
        taxRate = 0.00;
    } else if (TaxableIncome > 280 && TaxableIncome <= 388) {
        taxRate = 0.05;
    } else if (TaxableIncome > 388 && TaxableIncome <= 528) {
        taxRate = 0.10;
    } else if (TaxableIncome > 528 && TaxableIncome <= 3528) {
        taxRate = 0.175;
    } else {
        taxRate = 0.25;
    }

    return taxRate;
}


// ** New Basic Salary after Employee Pension is deducted ** //
function getNewBasicSalary(BasicSalaryAmount, TotalEmployeePensionAmount) {
    return BasicSalaryAmount - TotalEmployeePensionAmount;
}


// ** Gross Salary  ** //
function getGrossSalary(BasicSalary, TotalAllowanceAmount, TotalEmployerPensionAmount, TotalTaxReliefAmount) {
    return BasicSalary + TotalAllowanceAmount + TotalEmployerPensionAmount + TotalTaxReliefAmount;
}

// ** Tax Amount  ** //
function getTaxAmount(TaxRate, TaxableIncome) {
    return TaxRate * TaxableIncome;
}

// ** Net Salary  ** //
function getNetSalaryAmount(TaxAmount, TaxableIncome) {
    return TaxableIncome - TaxAmount;
}

module.exports = {
    getEmployeePension: getEmployeePension,
    getEmployerPension: getEmployerPension,
    getTotalEmployeePensionContributionForTier123: getTotalEmployeePensionContributionForTier123,
    getTotalEmployerPensionContributionForTier123: getTotalEmployerPensionContributionForTier123,
    getTaxRateFromTaxableIncome: getTaxRateFromTaxableIncome,
    getNewBasicSalary: getNewBasicSalary,
    getTaxAmount: getTaxAmount,
    getNetSalaryAmount: getNetSalaryAmount,
    getGrossSalary: getGrossSalary
};