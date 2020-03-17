import { Meteor } from 'meteor/meteor';
import numbro from 'numbro';

var autoformat = (value) => {
    let formatter = '0,0.0000';
    value = Math.round(value * 1000) / 1000
    if (Math.round(value) === value)
        formatter = '0,0'
    else if (Math.round(value*10) === value*10)
        formatter = '0,0.0'
    else if (Math.round(value*100) === value*100)
        formatter = '0,0.00'
    else if (Math.round(value*1000) === value*1000)
        formatter = '0,0.000'
    return numbro(value).format(formatter)
}

export default class Coin {
    static NativeTokenDenom = 'ubarkis';
    static StakingDenom = Meteor.settings.public.stakingDenom.toLowerCase();
    static StakingFraction = Number(Meteor.settings.public.stakingFraction);
    static MinStake = 1 / Number(Meteor.settings.public.stakingFraction);

    constructor(amount, denom=null) {
        if (typeof amount === 'object')
            ({amount, denom} = amount)
        if (!denom || denom.toLowerCase() === Coin.StakingDenom) {
            this._amount = Number(amount);
            this._denom = Coin.NativeTokenDenom;
        } else {
            this._amount = Number(amount);
            this._denom = denom;
        }
    }

    get amount () {
        return this._amount;
    }

    get nativeTokenDenom () {
        return Coin.NativeTokenDenom;
    }

    get stakingAmount () {
        return this._amount / Coin.StakingFraction;
    }

    toString (precision) {
        if (this._denom && this._denom !== Coin.NativeTokenDenom) {
            return `${numbro(this.amount/1000000).format('0,0')} ${this._denom}`;
        }
        // default to display in mint denom if it has more than 4 decimal places
        let minStake = Coin.StakingFraction/(precision?Math.pow(10, precision):10000)
        if (this.amount < minStake) {
            return `${numbro(this.amount).format('0,0')} ${Coin.NativeTokenDenom.toLowerCase()}`;
        } else {
            return `${precision?numbro(this.stakingAmount).format('0,0.' + '0'.repeat(precision)):autoformat(this.stakingAmount)} ${Coin.StakingDenom.toLowerCase()}`
        }
    }

    stakeString (formatter) {
        let amount = this.stakingAmount
        if (formatter) {
            amount = numbro(amount).format(formatter)
        }
        return `${amount} ${Coin.StakingDenom.toLowerCase()}`;
    }
}