import * as express from "express";
import { interfaces, controller, httpGet, httpPost, httpDelete, request, queryParam, response, requestParam, httpPut } from "inversify-express-utils";
import { inject } from "inversify";
import { TreeService } from "./tree.service";
import { MethodType, ControllerType, TransactionResult } from '../common/common.model';
import { RequestCreateTree, RequestDeleteTree, RequestUpdateSeqTree, RequestUpdateTree, Tree, TreeSearchCondition } from './tree.model';
import { CommonController } from "../common/common.controller";

@controller("")
export class TreeController implements interfaces.Controller {

  constructor( 
    @inject('TreeService') private treeService: TreeService,
    @inject('CommonController') private commonController: CommonController,
  ) {}

  @httpGet("/")
  private index(request: express.Request, res: express.Response, next: express.NextFunction): string {
      return "success!";
  }

  @httpPost("/tree")
  async insertTree(@request() request: express.Request, @response() res: express.Response) {
    const insertRequest: RequestCreateTree = request.body;
    console.log('insert tree=========================================');
    console.log(insertRequest);
    const result: TransactionResult = await this.treeService.insertTree(insertRequest);
    
    return this.commonController.createReturnMessage(ControllerType.TREE, result, insertRequest, MethodType.CREATE);
  }
    
  @httpGet("/tree")
  async retrieveTree(@request() request: express.Request, @response() res: express.Response) {
    const searchRequest: TreeSearchCondition = {
      depth: request.query.depth ? Number(request.query.depth) : 1,
      parent: request.query.parent ? Number(request.query.parent) : 0,
      secret: request.query.secret ? Number(request.query.secret) : 0,
    };
    console.log('retrieve tree=========================================');
    console.log(searchRequest);
    const result = await this.treeService.retrieveTree(searchRequest);

    return this.commonController.createReturnMessage(ControllerType.TREE, result, null, MethodType.READ);
  }

  @httpPut("/tree/:id")
  async updateTree(@request() request: express.Request, @response() res: express.Response) {
    const updateRequest: RequestUpdateTree = request.body;
    updateRequest.id = Number(request.params.id);
    console.log('update tree=========================================');
    console.log(updateRequest);
    const result: TransactionResult = await this.treeService.updateTree(updateRequest);
    
    return this.commonController.createReturnMessage(ControllerType.TREE, result, updateRequest, MethodType.UPDATE);
  }

  @httpDelete("/tree/:id")
  async deleteTree(@request() request: express.Request, @response() res: express.Response) {
    const deleteRequest: RequestDeleteTree = request.body;
    deleteRequest.id = Number(request.params.id);
    console.log('delete tree=========================================');
    console.log(deleteRequest);
    const result: TransactionResult = await this.treeService.deleteTree(deleteRequest);
    
    return this.commonController.createReturnMessage(ControllerType.TREE, result, deleteRequest, MethodType.DELETE);
  }

  @httpPut("/tree/:id/seq")
  async updateSeqTree(@request() request: express.Request, @response() res: express.Response) {
    const updateSeqRequest: RequestUpdateSeqTree = request.body;
    updateSeqRequest.id = Number(request.params.id);
    console.log('update seq tree=========================================');
    console.log(updateSeqRequest);
    const result: TransactionResult = await this.treeService.updateSeqTree(updateSeqRequest);
    
    return this.commonController.createReturnMessage(ControllerType.TREE, result, updateSeqRequest, MethodType.EXTRA);
  }
}