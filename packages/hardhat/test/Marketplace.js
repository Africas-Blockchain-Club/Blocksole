//const {expect} = require("chai");

const {
    loadFixture
} = require("@nomicfoundation/hardhat-network-helpers");
const { ethers } = require("ethers");


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
});