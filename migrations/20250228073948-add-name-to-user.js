// migrations/<timestamp>-add-name-to-user.js

export const up = async (queryInterface, Sequelize) => {
  await queryInterface.addColumn("Users", "name", {
    type: Sequelize.STRING,
    allowNull: false, // 필수 입력 항목
  });
};

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.removeColumn("Users", "name");
};
