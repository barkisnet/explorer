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
    static MintingDenom = Meteor.settings.public.mintingDenom.toLowerCase();
    static StakingFraction = Number(Meteor.settings.public.stakingFraction);
    static MinStake = 1 / Number(Meteor.settings.public.stakingFraction);

    constructor(amount, denom=null) {
        if (typeof amount === 'object')
            ({amount, denom} = amount)
        if (!denom || denom.toLowerCase() === Coin.MintingDenom) {
            this._amount = Number(amount);
            this._denom = Coin.MintingDenom;
        } else if (denom.toLowerCase() === Coin.StakingDenom) {
            this._amount = Number(amount) * Coin.StakingFraction;
            this._denom = Coin.StakingDenom;
        } else {
            this._amount = Number(amount);
            this._denom = denom;
        }
    }

    get amount () {
        return this._amount;
    }

    get stakingAmount () {
        return this._amount / Coin.StakingFraction;
    }

    toString (precision) {
        if (this._denom && this._denom !== Coin.NativeTokenDenom) {
            return `${numbro(this.amount).format('0,0')} ${this._denom}`;
        }
        // default to display in mint denom if it has more than 4 decimal places
        let minStake = Coin.StakingFraction/(precision?Math.pow(10, precision):10000)
        if (this.amount < minStake) {
            return `${numbro(this.amount).format('0,0')} ${Coin.MintingDenom}`;
        } else {
            return `${precision?numbro(this.stakingAmount).format('0,0.' + '0'.repeat(precision)):autoformat(this.stakingAmount)} ${Coin.StakingDenom.toLowerCase()}`
        }
    }

    mintString (formatter) {
        let amount = this.amount
        if (formatter) {
            amount = numbro(amount).format(formatter)
        }
        return `${amount} ${Coin.MintingDenom}`;
    }

    stakeString (formatter) {
        let amount = this.stakingAmount
        if (formatter) {
            amount = numbro(amount).format(formatter)
        }
        return `${amount} ${Coin.StakingDenom.toUpperCase()}`;
    }
}