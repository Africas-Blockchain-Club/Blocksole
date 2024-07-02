const {expect} = require("chai");

const {
    loadFixture
} = require("@nomicfoundation/hardhat-network-helpers");
const { describe } = require("mocha");


describe("Marketplace contract", function() {
    async function deployedMarketplaceFixture() {
        const [owner, addr1, addr2] = await ethers.getSigners();
        const marketPlace = await ethers.deployContract("Marketplace");
        await marketPlace.waitForDeployment();

        return {marketPlace, owner, addr1, addr2}
    }

    describe("Deployment", function() {
        it("Should set the right owner", async function() {
            const {marketPlace, owner} = await loadFixture(deployedMarketplaceFixture);
            expect(await marketPlace.owner()).to.equal(owner.address);
        });
    });

    describe("User registration", function() {
        it("Should allow a user to register", async function() {
            const {marketPlace, addr1} = await loadFixture(deployedMarketplaceFixture);
            await marketPlace.connect(addr1).registerUser();
            const user = await marketPlace.users(addr1.address);
            expect(user.WalletAddress).to.equal(addr1.address);
            expect(user.isSeller).to.be.false;
        });

        it("Should allow a user to upgrade to a seller", async function() {
            const {marketPlace, addr1} = await loadFixture(deployedMarketplaceFixture);
            await marketPlace.connect(addr1).registerUser();
            await marketPlace.connect(addr1).upgradeToSeller();
            const user = await marketPlace.users(addr1.address);
            expect(user.isSeller).to.be.true;
        });

        it("Should not allow a non-registered user to upgrade to a seller", async function() {
            const {marketPlace, addr1} = await loadFixture(deployedMarketplaceFixture);
            await expect(marketPlace.connect(addr1).upgradeToSeller()).to.be.revertedWith("User not registered");
        });

        it("Should not allow a user to register twice", async function() {
            const {marketPlace, addr1} = await loadFixture(deployedMarketplaceFixture);
            await marketPlace.connect(addr1).registerUser();
            await expect(marketPlace.connect(addr1).registerUser()).to.be.revertedWith("User already registered");
        });
    });

});