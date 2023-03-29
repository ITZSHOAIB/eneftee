const Eneftee_ERC20 = require("../artifacts/contracts/Eneftee_ERC20.sol/Eneftee_ERC20.json");
const { Contract, utils } = require("ethers");
const { JsonRpcProvider } = require("@ethersproject/providers");

const ERC20_CONTRACT_ADDRESS = process.env.ERC20_CONTRACT_ADDRESS;
const TOKEN_COST = process.env.TOKEN_COST;

const createTokenContract = (address) => {
  return new Contract(
    ERC20_CONTRACT_ADDRESS,
    Eneftee_ERC20.abi,
    new JsonRpcProvider().getSigner(address)
  );
};

async function mintToken(req, res, next) {
  try {
    console.log(req.body);
    const { address, amount } = req.body;
    console.log(address, amount);
    const tokenContract = createTokenContract(address);
    const transaction = await tokenContract.mint(amount, {
      value: utils.parseEther((TOKEN_COST * amount).toString()),
    });
    await transaction.wait();
    res.json({ success: true });
  } catch (err) {
    console.error(`ERC20Token: `, err.message);
    res.json({ success: false });
    next(err);
  }
}

async function myBalance(req, res, next) {
  try {
    const { address } = req.body;
    const tokenContract = createTokenContract(address);
    const myBalance = await tokenContract.balanceOf(address);
    res.json({ success: true, balance: myBalance.toNumber() });
  } catch (err) {
    console.error(`ERC20Token: `, err.message);
    res.json({ success: false });
    next(err);
  }
}

async function transferToken(req, res, next) {
  try {
    const { address, to, amount } = req.body;
    const tokenContract = createTokenContract(address);
    await tokenContract.transfer(to, amount);
    res.json({ success: true });
  } catch (err) {
    console.error(`ERC20Token: `, err.message);
    next(err);
  }
}

module.exports = {
  mintToken,
  myBalance,
  transferToken,
};
