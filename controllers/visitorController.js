import VisitorModel from "../models/visitorModel.js"; // ES 모듈 방식으로 import

// 모든 방문자 가져오기
const getAll = async (req, res) => {
  try {
    const visitors = await VisitorModel.getAll();
    res.render("visitor", { data: visitors });
  } catch (error) {
    console.error(error);
    res.status(500).send("서버 오류 발생");
  }
};

// 특정 방문자 정보 가져오기
const visitorOne = async (req, res) => {
  const visitor = await VisitorModel.getOne(req.params.id);
  if (!visitor) {
    return res.status(404).send("방명록을 찾을 수 없습니다.");
  }
  res.render("visitorone", { visitor });
};

// 방명록 등록
const createTest = async (req, res) => {
  try {
    const { userid, name, comment } = req.body;
    await VisitorModel.postData({ userid, name, comment });
    res.send("200");
  } catch (error) {
    console.error("방명록 등록 중 오류 발생:", error);
    res.status(500).send("서버 오류 발생");
  }
};

// 방명록 삭제
const deleteData = async (req, res) => {
  await VisitorModel.deleteRow(req.params.id);
  res.send("200");
};

// 수정 페이지로 이동
const moveWrite = async (req, res) => {
  const visitor = await VisitorModel.getOne(req.params.id);
  res.render("visitorwrite", { visitor });
};

// 방명록 데이터 업데이트
const dataUpdate = async (req, res) => {
  await VisitorModel.updateRow(req.body);
  res.send("200");
};

export default {
  getAll,
  visitorOne,
  createTest,
  deleteData,
  moveWrite,
  dataUpdate,
}; // default로 내보내기
